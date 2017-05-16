const fs = require('fs');
const { join } = require('path');
const mkdirp = require('mkdirp');

const resolve = (folder, relativePath) => join(folder, relativePath);
const isExists = (path, callback) => (
  fs.access(path, fs.constants.F_OK, err => callback(!err))
);
const isReadable = (path, callback) => (
  fs.access(path, fs.constants.R_OK, err => callback(!err))
);

const read = (path, callback) => {
  isExists(path, (exists) => {
    if (!exists) {
      return callback(new Error(`File '${path}' doesn't exist`));
    }
    return isReadable(path, (readable) => {
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
};

const parse = (content, callback) => {
  try {
    callback(null, JSON.parse(content));
  } catch (e) {
    callback(e);
  }
};

/**
 * Checks if folder exists and if not, creates it
 *
 * @param folder
 * @param cb
 */
const createFolder = (folder, cb) => {
  isExists(folder, (exist) => {
    if (!exist) {
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
};

export default {
  resolve,
  read,
  parse,
  createFolder,
  isExists,
  isReadable,
};
