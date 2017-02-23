const fs = require('fs');
const { join } = require('path');
const minimist = require('minimist');
const _get = require('lodash/get');
const _keys = require('lodash/keys');
const _concat = require('lodash/concat');
const _uniq = require('lodash/uniq');
const _merge = require('lodash/merge');
const _reduce = require('lodash/reduce');
const _omit = require('lodash/omit');

const REQUIRED = 'config.required.json'; // required
const DEFAULT = 'config.default.json'; // mandatory
const LOCAL = 'config.local.json'; // optional

let argv;
let defaultConfig;
let localConfig;
let appRoot;

function getAllArgv() {
  if (!argv) {
    argv = minimist(process.argv);
  }
  return argv;
}

function getArgv(name) {
  return getAllArgv[name];
}


function getEnv(name) {
  return process.env[name];
}

function getAllEnv() {
  const keys = _concat(
    _keys(localConfig),
    _keys(defaultConfig),
    _keys(getAllArgv)
  );
  const uniqueKeys = _uniq(keys);
  return _reduce(uniqueKeys, (acc, k) => {
    const value = getEnv(k);
    if (value) {
      _merge(acc, {
        [k]: value,
      });
    }
    return acc;
  }, {});
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

  // return appRoot as path if not already found in previous configs
  if (name === 'path') {
    return appRoot;
  }

  return undefined;
}

function getAll() {
  const all = _merge(
    {},
    defaultConfig,
    getAllEnv(),
    localConfig,
    getAllArgv()
  );
  return _omit(all, ['_', 'r']);
}

function checkRequired(names) {
  names.forEach((name) => {
    const value = get(name);
    if (typeof value !== 'undefined') {
      return undefined;
    }

    throw new Error(`A required config parameter is missing: ${name}`);
  });
}

function init(path, checkForRequired = false) {
  // persist app root dir as 'path'
  appRoot = path;

  if (defaultConfig) {
    // was already inited
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
    localConfig = JSON.parse(fs.readFileSync(localPath, 'utf8'));
  } catch (e) {
    localConfig = {};
  }

  // check for required parameters
  if (!checkForRequired) {
    return;
  }
  const requiredConfig = JSON.parse(fs.readFileSync(join(path, REQUIRED), 'utf8')) || [];
  checkRequired(requiredConfig);
}

// const universalGet = _pathOr(get, ['parameters', 'get'], global);

function universalGet() {
  const __get = _get(global, ['parameters', 'get'], get);
  // eslint-disable-next-line prefer-spread, prefer-rest-params
  return __get.apply(null, Array.prototype.slice.call(arguments));
}

module.exports = { init, get: universalGet, getAll };
