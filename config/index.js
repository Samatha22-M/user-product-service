
var json5      = require('json5');
var convict    = require('convict');
var path       = require('path');
var fs         = require('fs');
var _          = require('lodash');
var configFile = 'config/serverConfig.json';

function endsWithJSON(filename) {
    return filename.endsWith('.json');
}
function configName(filename) {
    return path.basename(filename, '.json');
}

/**
 * resolve relative path to absolute path from server root dir
 * @param {String} relativePath
 * @returns {String} absolute path
 */
function pathLoader (relativePath) {
    return path.join(__dirname, '..', relativePath);
}
configFile = pathLoader(configFile);

/**
 * create RegExp from string
 */
function regexCompiler (regexString) {
    return new RegExp(regexString);
}

convict.addFormat('path'  , _.noop , pathLoader);
convict.addFormat('regex' , _.noop , regexCompiler);

var confJSON = {};
_.map(_.filter(fs.readdirSync(path.join(__dirname, 'configs')), endsWithJSON), function(filename) {
    var _confPath = path.join(__dirname, 'configs', filename);
    confJSON[configName(filename)] = json5.parse(fs.readFileSync(_confPath, 'utf-8'));
});
var conf = convict(confJSON);

if (fs.existsSync(configFile)) {
    conf.loadFile(configFile);
} else {
    console.info('no config file found at %s', configFile);
}

conf.validate();

var _conf = conf._instance;

if ('get' in _conf) throw new Error('Do not set config.get');
_conf.get = conf.get.bind(conf);

module.exports = _conf;

