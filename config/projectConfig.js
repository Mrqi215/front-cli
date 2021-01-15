const projectName = require('./project')

const config = {
    //项目A
    firstProject: {
      pages: {
        index: {
          entry: 'src/projects/firstProject/main.js',
          outputDir: "dist/firstProject/",
          template: 'public/first-project-index.html',
          filename: 'index.html',
        }
      }
    },
    //项目B
    secondProject: {
      pages: {
        index: {
          entry: 'src/projects/secondProject/main.js',
          outputDir: "dist/projectB/",
          template: 'public/second-project-index.html',
          filename: 'index.html',
        }
      }
    },
    // 更多...
}

const configObj = config[projectName.name]
module.exports = configObj
