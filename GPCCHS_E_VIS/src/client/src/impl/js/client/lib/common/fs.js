const fs = require('fs');
const {
  join
} = require('path');

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
    console.log('absPath', absolutePath);
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
};
