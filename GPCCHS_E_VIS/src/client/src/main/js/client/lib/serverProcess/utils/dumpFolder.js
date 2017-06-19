const { tmpdir } = require('os');
const { join } = require('path');
const fs = require('fs');
const _isEmpty = require('lodash/isEmpty');
const { get } = require('../../common/configurationManager');
const getLogger = require('../../common/logManager');

const logger = getLogger('controllers:onTimebasedArchiveData');
let dumpFolder;

const createDumpFolder = (dataId) => {
  if (!dumpFolder) {
    dumpFolder = (_isEmpty(get('DUMP_DIR')) ? tmpdir() : get('DUMP_DIR'));
  }
  // check validity of dataId
  if (!dataId || !dataId.parameterName) {
    return;
  }
  // create folders:
  // dumpFolder
  //  - catalog
  //    - comObject
  //      - parameterName
  try {
    fs.mkdirSync(dumpFolder);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${dumpFolder}`);
      return;
    }
  }
  const catalogDir = join(dumpFolder, dataId.catalog);
  try {
    fs.mkdirSync(catalogDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${catalogDir}`);
      return;
    }
  }
  const comObjectDir = join(catalogDir, dataId.comObject);
  try {
    fs.mkdirSync(comObjectDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${comObjectDir}`);
      return;
    }
  }

  const paramDir = join(comObjectDir, dataId.parameterName);
  try {
    fs.mkdirSync(paramDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${paramDir}`);
    }
  }
};

const getDumpFolder = (dataId) => {
  if (!dumpFolder) {
    dumpFolder = (_isEmpty(get('DUMP_DIR')) ? tmpdir() : get('DUMP_DIR'));
  }
  return join(dumpFolder, dataId.catalog, dataId.comObject, dataId.parameterName);
};

module.exports = { createDumpFolder, getDumpFolder };
