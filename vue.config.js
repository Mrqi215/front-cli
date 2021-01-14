const path = require('path');
const webpack = require('webpack');
const ServerConfig = require('./server-config')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
require('events').EventEmitter.prototype._maxListeners = 100;
//服务器的ip和端口
let serverIpPort = ServerConfig.ip;
const PROXY_URL = process.env.NODE_ENV === 'development' ?
    `http://${serverIpPort}` :
    '/';
// 第二个空字符串是生产环境的地址
const BASE_URL = process.env.NODE_ENV === 'development' ? '/' : './';
const resolve = dir => {
    return path.join(__dirname, dir);
};
// 配置详解：https://cli.vuejs.org/zh/confiåg/#lintonsave
module.exports = {
    publicPath: BASE_URL,
    //基于node 的 os module去判断操作系统里的CPU是否支持并行构建，以提高构建速度。
    parallel: require('os').cpus().length > 1,
    lintOnSave: process.env.NODE_ENV === 'production' ? false : 'error',
    configureWebpack: {
        output: {
            filename: `[name].[hash].js`,
            chunkFilename: `[name].[hash].js`
        },
        plugins: [
            new HardSourceWebpackPlugin({
                    cacheDirectory: process.cwd() + '/cache/hard-source/[confighash]',
                    environmentHash: {
                        root: process.cwd(),
                        directories: [],
                        files: ['package-lock.json', 'yarn.lock'],
                    },
                    cachePrune: {
                        maxAge: 5 * 24 * 60 * 60 * 1000,
                        sizeThreshold: 2 * 1024 * 1024 * 1024
                    },
            }),
            new webpack.ProvidePlugin({
                // other modules
                introJs: ['intro.js']
            }),
          ]
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve(
                    'src'))
            .set('_c', resolve('src/components'));
        config.plugin("").use(new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /zh-cn/,
        ));
    },
    productionSourceMap: false,
    pluginOptions: {
        serverIpPort: serverIpPort
    },
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8000,
        https: false,
        open : true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                target: PROXY_URL + '/api/',
                changeOrigin: true,
                timeout: 6 * 60000,
                pathRewrite: {
                    '^/api': ''
                }
            },

        }
    }
};

