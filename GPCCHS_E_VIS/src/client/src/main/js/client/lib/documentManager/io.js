import fs from 'fs';
import { join } from 'path';
import _ from 'lodash/fp';
import startsWith from 'lodash/fp/startsWith';

import {
  read, parse,
  readJsonFromAbsPath, readJsonFromRelativePath,
} from '../common/fs';

const readJsonFromFmdPath = fmdApi => (filepath, callback) => {
  resolvedPath = undefined;
  if (!_.startsWith('/', filepath)) {
    return callback(new Error(`Invalid FMD path ${filepath}`));
  }
  let resolvedPath = join(fmdApi.getRootDir(), filepath);
  // relative path from FMD
  try {
    fs.accessSync(resolvedPath, fs.constants.F_OK);
  } catch (e) {
    // path is already absolute
    resolvedPath = filepath;
  }
  return read(resolvedPath, (err, content) => {
    if (err) {
      return callback(err);
    }
    return parse(content, callback);
  });
};

const readJsonFromOId = fmdApi => (oId, callback) => {
  fmdApi.resolveDocument(oId, (err, path, properties) => {
    if (err) {
      callback(err);
      return;
    }
    readJsonFromFmdPath(fmdApi)(path, (error, json) => callback(error, json, properties));
  });
};

export const readDocument = fmdApi => (folder, relativePath, oId, absolutePath, callback) => {
  if (absolutePath) {
    return readJsonFromAbsPath(absolutePath, callback);
  }
  if (oId) {
    return readJsonFromOId(fmdApi)(oId, callback);
  }
  if (folder && !startsWith('/', relativePath)) {
    return readJsonFromRelativePath(folder, relativePath, callback);
  }
  return readJsonFromFmdPath(fmdApi)(relativePath, callback);
};

export const writeDocument = fmdApi => (path, json, callback) => {
  const spaces = 2; // beautify json with 2 spaces indentations
  const data = JSON.stringify(json, null, spaces);
  if (!startsWith('/', path)) {
    return callback(new Error('path should be absolute'));
  }
  if (fmdApi.isInFmd(path)) {
    return fmdApi.createDocument(path, json.type, (err, oid) => {
      if (err) {
        return callback(err);
      }
      return fs.writeFile(path, data, (errWriting) => {
        if (errWriting) {
          callback(errWriting);
          return;
        }
        callback(null, oid);
      });
    });
  }
  return fs.writeFile(path, data, callback);
};
