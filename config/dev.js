let projectName = process.argv[2]
let ip = null;
try {
    if (process.env.npm_config_user_agent.split('/')[1].indexOf(7) === 0) {
        ip = process.argv[3]
    } else {
        const configArgv = JSON.parse(process.env.npm_config_argv);
        const original = configArgv.original.slice(1);
        original.forEach((e, index) => {
            let arr = e.replace(/-/g, '').split(':')
            if (arr.length === 2) {
                ip = e
            }
        })
    }
} catch (err) {
}
let fs = require('fs');
// 记录正在运行的项目名
fs.writeFileSync('./config/project.js', `exports.name = '${projectName}'`)
// 启动一个新的进程，并执行命令
let exec = require('child_process').execSync;
if(ip){
    exec('npm run dev '+ip, {stdio: 'inherit'});
}else{
    exec('npm run dev ', {stdio: 'inherit'});
}

