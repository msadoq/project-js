const fs = require('fs');
const {
  join,
} = require('path');
const mkdirp = require('mkdirp');
const _startsWith = require('lodash/startsWith');

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
    return self.read(resolvedPath, (err, content) => {
      if (err) {
        return callback(err);
      }
      return self.parse(content, callback);
    });
  },

  /**
   * Checks if a path exists
   *
   * @param path folder
   * @param cb
   */
  checkPath: (path, cb) => {
    fs.exists(path, (pathExist) => {
      if (pathExist) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    });
  },

  /**
   * Checks if folder exists and if not, creates it
   *
   * @param folder
   * @param cb
   */
  createFolder: (folder, cb) => {
    fs.access(folder, fs.constants.F_OK, (noAccess) => {
      if (noAccess) {
        mkdirp(folder, (err) => {
          if (err) {
            cb(new Error(`Unable to create folder ${folder} : ${err}`));
          } else {
            cb(null, true);
          }
        });
      } else {
        cb(null, true);
      }
    });
  },
};
