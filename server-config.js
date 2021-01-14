let ip = null;
try {
    if (process.env.npm_config_user_agent.split('/')[1].indexOf(7) === 0) {
        ip = process.argv[3].replace(/-/g, '')
    } else {
        const configArgv = JSON.parse(process.env.npm_config_argv);
        const original = configArgv.original.slice(1);
        original.forEach((e, index) => {
            let arr = e.replace(/-/g, '').split(':')
            if (arr.length === 2) {
                ip = e.replace(/-/g, '')
            }
        })
    }
} catch (err) {
    console.error(err)
}

module.exports = {
    ip
};
