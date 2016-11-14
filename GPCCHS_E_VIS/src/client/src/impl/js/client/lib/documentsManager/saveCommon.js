const { constants, accessSync } = require('fs');
const mkdirpSync = require('mkdirp').sync;
const parameters = require('../common/parameters');

const root = parameters.FMD_ROOT;

// Checks folder exists and if not, creates it
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
