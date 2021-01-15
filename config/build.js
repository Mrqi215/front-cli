let projectName = process.argv[2]
console.log(process.argv[2])
console.log('\x1B[32m','————————————————您正在打包的项目名是————————————————', projectName);

let fs = require('fs')

// 记录正在运行的项目名
fs.writeFileSync('./config/project.js', `exports.name = '${projectName}'`)


// 启动一个新的进程，并执行命令
let exec = require('child_process').execSync;
exec('npm run build', {stdio: 'inherit'});


