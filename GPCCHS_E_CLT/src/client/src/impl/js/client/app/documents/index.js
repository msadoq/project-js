const fs = require('fs');
const { join } = require('path');

// TODO test

const FMD_ROOT = process.env.FMD_ROOT;

const self = module.exports = {
  resolve: path => join(FMD_ROOT, path),
  isExists: (path, callback) => fs.access(path, fs.constants.F_OK, err => callback(!err)),
  isReadable: (path, callback) => fs.access(path, fs.constants.R_OK, err => callback(!err)),
  read: (path, callback) => {
    self.isExists(path, exists => {
      if (!exists) {
        return callback(new Error(`File '${path}' doesn't exist`));
      }
      return self.isReadable(path, readable => {
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
  readJsonFromPath: (path, callback) => {
    self.read(self.resolve(path), (err, content) => {
      if (err) {
        return callback(err);
      }
      return self.parse(content, callback);
    });
  },
};
