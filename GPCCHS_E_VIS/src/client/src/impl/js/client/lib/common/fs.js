/* eslint no-underscore-dangle: 0 */
const fs = require('fs');
const {
  join
} = require('path');
const mkdirpSync = require('mkdirp').sync;
const _startsWith = require('lodash/startsWith');
const { getWebsocket } = require('../mainProcess/websocket');
const globalConstants = require('common/constants');
const parameters = require('./parameters');
const { v4 } = require('node-uuid');
const { set } = require('common/callbacks/register');

const root = parameters.FMD_ROOT;

let resolvedPath;

function requestPathFromOId(oid, callback) {
  const queryId = v4();
  set(queryId, callback);
  getWebsocket().write({
    event: globalConstants.EVENT_FILEPATH_QUERY,
    queryId,
    payload: {
      oid,
    }
  });
}

const self = module.exports = {
  getPath: () => resolvedPath,
  resolve: (folder, relativePath) => join(folder, relativePath),
  isExists: (path, callback) => fs.access(path, fs.constants.F_OK, err => callback(!err)),
  isReadable: (path, callback) => fs.access(path, fs.constants.R_OK, err => callback(!err)),
  read: (path, callback) => {
    self.isExists(path, (exists) => {
      if (!exists) {
        return callback(new Error(`File '${path}' doesn't exist`));
      }
      return self.isReadable(path, (readable) => {
        if (!readable) {
          return callback(new Error(`File '${path}' isn't readable`));
        }
        return fs.readFile(path, 'utf8', (err, content) => {
          if (err) {
            return callback(new Error(err));
          }
          return callback(null, content);
        });
      });
    });
  },
  parse: (content, callback) => {
    let json;
    try {
      json = JSON.parse(content);
    } catch (e) {
      return callback(e);
    }
    return callback(null, json);
  },
  readJsonFromAbsPath: (absolutePath, callback) => {
    resolvedPath = absolutePath;
    self.read(absolutePath, (err, content) => {
      if (err) {
        return callback(err);
      }
      return self.parse(content, callback);
    });
  },
  readJsonFromOId: (oId, callback) => {
    resolvedPath = undefined;
    requestPathFromOId(oId, (err, payload) => {
      if (err) {
        return callback(err);
      }
      return self.readJsonFromFmdPath(payload, callback);
    });
  },
  readJsonFromRelativePath: (folder, path, callback) => {
    resolvedPath = undefined;
    // Relative path from local folder
    if (!folder || _startsWith(path, '/')) {
      // relative path from folder
      return callback(new Error(`Invalid relative path: ${folder}, ${path}`));
    }
    resolvedPath = join(folder, path);
    self.read(resolvedPath, (err, content) => {
      if (err) {
        return callback(err);
      }
      return self.parse(content, callback);
    });
  },
  readJsonFromFmdPath: (filepath, callback) => {
    resolvedPath = undefined;
    if (!_startsWith(filepath, '/')) {
      return callback(new Error(`Invalid FMD path ${filepath}`));
    }
    // relative path from FMD
    try {
      fs.accessSync(join(root, filepath), fs.constants.F_OK);
      // FMD path
      resolvedPath = join(root, filepath);
    } catch (e) {
      // path is already absolute
      resolvedPath = filepath;
    }
    self.read(resolvedPath, (err, content) => {
      if (err) {
        return callback(err);
      }
      return self.parse(content, callback);
    });
  },
  readJsonFromPath: (folder, relativePath, oId, absolutePath, callback) => {
    if (absolutePath) {
      return self.readJsonFromAbsPath(absolutePath, callback);
    }
    if (oId) {
      return self.readJsonFromOId(oId, callback);
    }
    if (folder && !_startsWith(relativePath, '/')) {
      return self.readJsonFromRelativePath(folder, relativePath, callback);
    }
    return self.readJsonFromFmdPath(relativePath, callback);
  },
  /**
   * Checks if folder exists and if not, creates it
   *
   * @param folder
   * @return {Error}
   */
  checkPath: (folder) => {
    try {
      fs.accessSync(folder, fs.constants.F_OK);
    } catch (e) {
      // TODO check if folder is on FMD
      mkdirpSync(folder);
      try {
        fs.accessSync(folder, fs.constants.F_OK);
      } catch (err) {
        return new Error(`Unable to create folder ${folder}`);
      }
    }
  },
};
