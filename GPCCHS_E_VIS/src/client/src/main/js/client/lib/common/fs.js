// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Change configuration FMD_ROOT_DIR to ISIS_DOCUMENTS_ROOT
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Move readJsonFromFmdPath function in documentManager/io
// VERSION : 1.1.2 : DM : #3622 : 02/03/2017 : Fix bug about absolutePath resolution
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Fix linting rules on hsc hss and common
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Refacto common/fs, add common/pathResolver, impact documentManager/io
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Remove useless checkPath in common/fs
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Rewrite common/fs exports . .
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Remove unsafe getPath from common/fs
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Rewrite common/fs exports . .
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Refacto common/fs, add common/pathResolver, impact documentManager/io
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Remove useless checkPath in common/fs
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Remove unsafe getPath from common/fs
// END-HISTORY
// ====================================================================

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
