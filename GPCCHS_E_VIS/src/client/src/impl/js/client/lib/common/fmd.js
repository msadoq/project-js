import { writeFile } from 'fs';
import { join } from 'path';

import parameters from 'common/parameters';
import startsWith from 'lodash/startsWith';
import ipc from '../mainProcess/ipc';
import {
  readJsonFromAbsPath, readJsonFromRelativePath, readJsonFromFmdPath,
} from './fs';

const readJsonFromOId = (oId, callback) => {
  ipc.server.requestFmdGet(oId, ({ err, detail }) => {
    if (err) {
      return callback(err);
    }
    const { dirname, basename } = detail;
    return readJsonFromFmdPath(
      join(parameters.get('FMD_ROOT_DIR'), dirname, basename),
      callback
     );
  });
};

/*
* readJson and writeJson are top level functions to read/write documents.
* the filesystem primitives are in lib/common/fs.js
*/
const readJson = (folder, relativePath, oId, absolutePath, callback) => {
  if (absolutePath) {
    return readJsonFromAbsPath(absolutePath, callback);
  }
  if (oId) {
    return readJsonFromOId(oId, callback);
  }
  if (folder && !startsWith(relativePath, '/')) {
    return readJsonFromRelativePath(folder, relativePath, callback);
  }
  return readJsonFromFmdPath(relativePath, callback);
};

// TODO : write tests
const writeJson = (path, json, callback) => {
  const spaces = 2; // beautify json with 2 spaces indentations
  const data = JSON.stringify(json, null, spaces);
  return writeFile(path, data, callback);
};

const fmdApi = {
  writeJson,
  readJson,
};

module.exports = fmdApi;
