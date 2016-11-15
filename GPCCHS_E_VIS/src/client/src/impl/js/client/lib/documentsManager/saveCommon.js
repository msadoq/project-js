const { constants, accessSync } = require('fs');
const mkdirpSync = require('mkdirp').sync;

// TODO aleal move in common/fs.js

/**
 * Checks if folder exists and if not, creates it
 *
 * @param folder
 * @return {Error}
 */
function checkPath(folder) {
  try {
    accessSync(folder, constants.F_OK);
  } catch (e) {
    // TODO check if folder is on FMD
    mkdirpSync(folder);
    try {
      accessSync(folder, constants.F_OK);
    } catch (err) {
      return new Error(`Unable to create folder ${folder}`);
    }
  }
}

module.exports = checkPath;
