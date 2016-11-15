const fs = require('fs');
const {
  join
} = require('path');
const mkdirpSync = require('mkdirp').sync;

const self = module.exports = {
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
    try {
      const json = JSON.parse(content);
      return callback(null, json);
    } catch (e) {
      return callback(e);
    }
  },
  readJsonFromAbsPath: (absolutePath, callback) => {
    self.read(absolutePath, (err, content) => {
      if (err) {
        return callback(err);
      }
      return self.parse(content, callback);
    });
  },
  readJsonFromPath: (folder, relativePath, callback) => {
    self.read(self.resolve(folder, relativePath), (err, content) => {
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
