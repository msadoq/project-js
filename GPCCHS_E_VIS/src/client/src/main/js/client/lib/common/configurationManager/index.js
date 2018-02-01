// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Add types.proto in dc - Add parse/stringify mechanism to configurationManager
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Fix a configurationManager bug that ignore CLI parameters.
// VERSION : 1.1.2 : FA : #6798 : 21/06/2017 : Modify configuration parameter to parse conf in forked process
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Merge branch 'dev' into dbrugne-lifecycle
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Fix event loop blocking due to systematic JSON.parse in configurationManager
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Fix important performance leak due to systematic JSON.parse
// VERSION : 1.1.2 : FA : #6798 : 23/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Modify health monitoring mechanism : - Handle properly start and stop - Add critical delay value in conf - Only start monitoring on DEBUG
// END-HISTORY
// ====================================================================

const fs = require('fs');
const { join } = require('path');
const minimist = require('minimist');
const _get = require('lodash/get');
const _merge = require('lodash/merge');
const _omit = require('lodash/omit');

const REQUIRED = 'config.required.json'; // required
const DEFAULT = 'config.default.json'; // mandatory
const LOCAL = 'config.local.json'; // optional

let fmdConfig = {};
let argv;
let defaultConfig;
let localConfig;
let appRoot;

function setFmdConfiguration(config) {
  fmdConfig = config;
}

function getFmdConfiguration(name) {
  return fmdConfig[name];
}

function getAllArgv() {
  if (!argv) {
    argv = minimist(process.argv);
  }
  return argv;
}

function getArgv(name) {
  return getAllArgv()[name];
}

// TODO : remove this workaround in configurationManager refactoring
const env = process.env.mainProcessConfig
  ? JSON.parse(process.env.mainProcessConfig)
  : process.env;
function getEnv(name) {
  return env[name];
}

function getAllEnv() {
  return process.env;
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

  value = getFmdConfiguration(name);
  if (hasValue()) {
    return value;
  }

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
    defaultConfig,
    getAllEnv(),
    localConfig,
    getAllArgv(),
    fmdConfig
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

function universalGet(name) {
  return _get(global, ['parameters', 'get'], get)(name);
}

module.exports = { init, get: universalGet, getAll, setFmdConfiguration };
