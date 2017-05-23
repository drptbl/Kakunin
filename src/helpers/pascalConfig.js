const pascalConf = process.argv.find(name => name.indexOf('--pascalConfig') >= 0);

const pascalConfigPath = pascalConf.substr(pascalConf.indexOf('=') + 1 );

const project = process.argv.find(name => name.indexOf('--projectPath') >= 0);

const projectPath = project.substr(project.indexOf('=') + 1);

const pascalConfig = require(pascalConfigPath);
pascalConfig.projectPath = projectPath;

module.exports = pascalConfig;