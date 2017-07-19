const { tmpdir } = require('os');
const { join } = require('path');
const { writeFile, mkdirSync } = require('fs');
const _isEmpty = require('lodash/isEmpty');
const { get } = require('../../common/configurationManager');
const getLogger = require('../../common/logManager');

const logger = getLogger('utils:dumpBuffer');

let dumpFolder;
const dataFolder = {};

const createDumpFolder = (dataId) => {
  // check validity of dataId
  if (!dataId || !dataId.parameterName) {
    return;
  }
  // Check if folder already exists
  if (dataFolder[join(dataId.catalog, dataId.comObject, dataId.parameterName)]) {
    return;
  }
  if (!dumpFolder) {
    dumpFolder = (_isEmpty(get('DUMP_DIR')) ? tmpdir() : get('DUMP_DIR'));
  }
  // create folders:
  // dumpFolder
  //  - catalog
  //    - comObject
  //      - parameterName
  try {
    mkdirSync(dumpFolder);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${dumpFolder}`);
      return;
    }
  }
  const catalogDir = join(dumpFolder, dataId.catalog);
  try {
    mkdirSync(catalogDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${catalogDir}`);
      return;
    }
  }
  const comObjectDir = join(catalogDir, dataId.comObject);
  try {
    mkdirSync(comObjectDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${comObjectDir}`);
      return;
    }
  }

  const paramDir = join(comObjectDir, dataId.parameterName);
  try {
    mkdirSync(paramDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${paramDir}`);
    }
  }
  // Remember data folder
  dataFolder[join(dataId.catalog, dataId.comObject, dataId.parameterName)] =
    join(dumpFolder, dataId.catalog, dataId.comObject, dataId.parameterName);
};

// if dump is activated, it is written in log
const dumpLog = () => {
  if (get('DUMP') === 'on') {
    const dumpDir = (_isEmpty(get('DUMP_DIR')) ? tmpdir() : get('DUMP_DIR'));
    logger.warn(`Received payloads are dumped in ${dumpDir}`);
  }
};

/** write buffer in a file with timestamp as name
 * @param dataId: defines folder hierarchy
 * @param timestamp: buffer corresponding timestamp in ms
 * @param buffer: the buffer to save in file
 **/
const dumpBuffer = (dataId, timestamp, buffer) => {
  // check dump activation
  if (get('DUMP') === 'on') {
    // Create dump folder if it doesn't exist
    createDumpFolder(dataId);
    // get path
    const dumpPath = dataFolder[join(dataId.catalog, dataId.comObject, dataId.parameterName)];
    if (dumpPath) {
      // save a file per timestamp with binary payload
      writeFile(join(dumpPath, timestamp.toString()), buffer, (err) => {
        if (err) {
          logger.warn(`Error writing dump file ${timestamp}`);
        }
      });
    }
  }
};

module.exports = { dumpBuffer, dumpLog, createDumpFolder };
