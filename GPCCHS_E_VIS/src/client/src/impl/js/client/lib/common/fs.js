const fs = require('fs');
const {
  join
} = require('path');
const mkdirp = require('mkdirp');
const _startsWith = require('lodash/startsWith');
const parameters = require('common/parameters');

let resolvedPath;

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
      fs.accessSync(join(parameters.get('FMD_ROOT_DIR'), filepath), fs.constants.F_OK);
      // FMD path
      resolvedPath = join(parameters.get('FMD_ROOT_DIR'), filepath);
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
  /**
   * Checks if folder exists and if not, creates it
   *
   * @param folder
   * @return {Promise}
   */
  createFolder: folder => new Promise((resolve, reject) => {
    fs.access(folder, fs.constants.F_OK, (noAccess) => {
      if (noAccess) {
        // TODO check if folder is on FMD
        mkdirp(folder, (err) => {
          if (err) {
            reject(new Error(`Unable to create folder ${folder} : ${err}`));
          } else {
            resolve(true);
          }
        });
      } else {
        resolve(true);
      }
    });
  }),
};
