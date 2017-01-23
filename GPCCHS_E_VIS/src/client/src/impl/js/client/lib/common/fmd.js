import startsWith from 'lodash/fp/startsWith';
import { relative, join, basename, dirname } from 'path';

import mimeTypes from 'common/constants/mimeTypes';
import parameters from 'common/parameters';

import ipc from '../mainProcess/ipc';
import { checkPath } from './fs';

const getRootDir = () => parameters.get('FMD_ROOT_DIR');
const isFmd = path => startsWith(getRootDir(), path);
const getRelativeFmdPath = path => `/${relative(getRootDir(), path)}`;

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

const fmdApi = {
  getRootDir,
  isFmd,
  getRelativeFmdPath,
  createDocument,
  resolveDocument,
};

module.exports = fmdApi;
