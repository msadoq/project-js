const fs = require('fs');
const { join } = require('path');
const minimist = require('minimist');
const getLogger = require('../log');

const logger = getLogger('parameters');

const DEFAULT = 'config.default.json'; // mandatory
const LOCAL = 'config.local.json'; // optional

let argv;
let defaultConfig;
let localConfig;

function init(path) {
  defaultConfig = JSON.parse(fs.readFileSync(join(path, DEFAULT), 'utf8'));

  // optional local config file
  try {
    const localPath = join(path, LOCAL);
    fs.accessSync(localPath, fs.constants.F_OK);
    fs.accessSync(localPath, fs.constants.R_OK);
    localConfig = Object.assign(JSON.parse(fs.readFileSync(localPath, 'utf8')), { path });
    logger.info(`local configuration file loaded: ${localConfig}`);
  } catch (e) {
    logger.info('no local configuration file found');
  }
}

function getArgv(name) {
  if (!argv) {
    argv = minimist(process.argv);
  }

  return argv[name];
}

function getEnv(name) {
  return process.env[name];
}

function getLocal(name) {
  if (!localConfig) {
    return undefined;
  }

  return localConfig[name];
}

function getDefault(name) {
  if (!defaultConfig) {
    return undefined;
  }

  return defaultConfig[name];
}

/**
 * Search for argument name in:
 * - process.argv (cli)
 * - local values from file
 * - process.env (environment)
 * - default values from file
 */
function get(name) {
  let value;
  value = getArgv(name);
  if (typeof value !== 'undefined') {
    return value;
  }
  value = getLocal(name);
  if (typeof value !== 'undefined') {
    return value;
  }
  value = getEnv(name);
  if (typeof value !== 'undefined') {
    return value;
  }
  value = getDefault(name);
  if (typeof value !== 'undefined') {
    return value;
  }

  return undefined;
}

module.exports = { init, get };
