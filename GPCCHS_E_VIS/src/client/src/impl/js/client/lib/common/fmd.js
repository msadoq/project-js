import { writeFile } from 'fs';
import { relative, join, basename, dirname } from 'path';

import startsWith from 'lodash/fp/startsWith';

import mimeTypes from 'common/constants/mimeTypes';
import parameters from 'common/parameters';

import ipc from '../mainProcess/ipc';
import {
  readJsonFromAbsPath, readJsonFromRelativePath, readJsonFromFmdPath, checkPath
} from './fs';

const getRootDir = () => parameters.get('FMD_ROOT_DIR');
const isFmd = path => startsWith(getRootDir(), path);
const getRelativeFmdPath = path => relative(getRootDir(), path);

const resolveDocument = (oId, callback) => {
  ipc.server.requestFmdGet(oId, ({ err, detail }) => {
    if (err) {
      return callback(err);
    }
    callback(null, join(getRootDir(), detail.dirname.value, detail.basename.value));
  });
};

const createDocument = (path, documentType, callback) => {
  const mimeType = mimeTypes[documentType];
  if (!mimeType) {
    return callback(`Unknown documentType : ${documentType}`);
  }
  const fileName = basename(path);
  const folder = dirname(getRelativeFmdPath(path));
  checkPath(path).then(() => callback(null))
    .catch(() => {
      ipc.server.requestFmdCreate(folder, fileName, mimeType, ({ err, serializedOid }) => {
        if (err) {
          return callback(err);
        }
        callback(null, serializedOid);
      });
    });
};

const readJsonFromOId = (oId, callback) => {
  resolveDocument(oId, (err, path) => {
    if (err) {
      return callback(err);
    }
    readJsonFromFmdPath(path, callback);
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
  if (folder && !startsWith('/', relativePath)) {
    return readJsonFromRelativePath(folder, relativePath, callback);
  }
  return readJsonFromFmdPath(relativePath, callback);
};

// TODO : write tests
const writeJson = (path, json, callback) => {
  const spaces = 2; // beautify json with 2 spaces indentations
  const data = JSON.stringify(json, null, spaces);
  if (isFmd(path)) {
    return createDocument(path, json.type, (err, oid) => {
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

const fmdApi = {
  getRootDir,
  isFmd,
  getRelativeFmdPath,
  createDocument,
  resolveDocument,
  writeJson,
  readJson,
};

module.exports = fmdApi;
