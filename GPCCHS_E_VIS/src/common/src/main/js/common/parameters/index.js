const fs = require('fs');
const { join } = require('path');
const minimist = require('minimist');
const R = require('ramda');

const DEFAULT = 'config.default.json'; // mandatory
const LOCAL = 'config.local.json'; // optional

let argv;
let defaultConfig;
let localConfig;

function init(path) {
  if (localConfig) {
    return;
  }

  if (!fs.existsSync(join(path, DEFAULT))) {
    return;
  }

  defaultConfig = JSON.parse(fs.readFileSync(join(path, DEFAULT), 'utf8'));

  // optional local config file
  try {
    const localPath = join(path, LOCAL);
    fs.accessSync(localPath, fs.constants.F_OK);
    fs.accessSync(localPath, fs.constants.R_OK);
    localConfig = Object.assign(JSON.parse(fs.readFileSync(localPath, 'utf8')), { path });
  } catch (e) {} // eslint-disable-line no-empty
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
  const hasValue = () => typeof value !== 'undefined';

  value = getArgv(name);
  if (hasValue()) {
    return value;
  }
  value = getLocal(name);
  if (hasValue()) {
    return value;
  }
  value = getEnv(name);
  if (hasValue()) {
    return value;
  }
  value = getDefault(name);
  if (hasValue()) {
    return value;
  }
  return undefined;
}

const universalGet = R.pathOr(get, ['parameters', 'get'], global);


module.exports = { init, get: universalGet };
