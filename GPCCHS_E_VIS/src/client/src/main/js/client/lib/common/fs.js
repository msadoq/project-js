const fs = require('fs');
const {
  join,
} = require('path');
const mkdirp = require('mkdirp');

let resolvedPath;

const self = {
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
          resolvedPath = path;
          return callback(null, content);
        });
      });
    });
  },
  parse: (content, callback) => {
    try {
      callback(null, JSON.parse(content));
    } catch (e) {
      callback(e);
    }
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

module.exports = self;
