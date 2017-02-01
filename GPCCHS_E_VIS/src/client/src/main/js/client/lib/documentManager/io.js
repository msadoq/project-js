import { writeFile } from 'fs';
import startsWith from 'lodash/fp/startsWith';

import {
  readJsonFromAbsPath, readJsonFromRelativePath, readJsonFromFmdPath,
} from '../common/fs';

const readJsonFromOId = fmdApi => (oId, callback) => {
  fmdApi.resolveDocument(oId, (err, path, properties) => {
    if (err) {
      return callback(err);
    }
    readJsonFromFmdPath(path, (error, json) => callback(error, json, properties));
  });
};

export const readDocument = fmdApi => (folder, relativePath, oId, absolutePath, callback) => {
  if (absolutePath) {
    return readJsonFromAbsPath(absolutePath, callback);
  }
  if (oId) {
    return readJsonFromOId(fmdApi)(oId, (err, json, properties) => callback(err, json, properties));
  }
  if (folder && !startsWith('/', relativePath)) {
    return readJsonFromRelativePath(folder, relativePath, callback);
  }
  return readJsonFromFmdPath(relativePath, callback);
};

export const writeDocument = fmdApi => (path, json, callback) => {
  const spaces = 2; // beautify json with 2 spaces indentations
  const data = JSON.stringify(json, null, spaces);
  if (fmdApi.isInFmd(path)) {
    return fmdApi.createDocument(path, json.type, (err, oid) => {
      if (err) {
        return callback(err);
      }
      writeFile(path, data, (errWriting) => {
        if (errWriting) {
          return callback(err);
        }
        callback(null, oid);
      });
    });
  }
  writeFile(path, data, callback);
};