const fs = require('fs');
const { join } = require('path');
const minimist = require('minimist');

const DEFAULT = 'config.default.json'; // mandatory
const LOCAL = 'config.local.json'; // optional

let argv;
let defaultConfig;
let localConfig;

function init(path) {
  if (localConfig) {
    return;
  }

  defaultConfig = JSON.parse(fs.readFileSync(join(path, DEFAULT), 'utf8'));

  // optional local config file
  try {
    const localPath = join(path, LOCAL);
    fs.accessSync(localPath, fs.constants.F_OK);
    fs.accessSync(localPath, fs.constants.R_OK);
    localConfig = Object.assign(JSON.parse(fs.readFileSync(localPath, 'utf8')), { path });
    // eslint-disable-next-line no-console
    console.log(`[pid=${process.pid}] local configuration file loaded`, localConfig);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('no local configuration file found');
  }
}
// Initiliaze parameters ASAP
init(process.cwd());

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

const universalGet = (...args) => {
  const fn = (global.parameters && global.parameters.get) || get;
  return fn(...args);
};

module.exports = { init, get: universalGet };
