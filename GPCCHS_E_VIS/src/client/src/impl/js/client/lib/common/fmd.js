import startsWith from 'lodash/fp/startsWith';
import { relative, join, basename, dirname } from 'path';

import mimeTypes from 'common/constants/mimeTypes';
import parameters from 'common/parameters';
import globalConstants from 'common/constants';

import ipc from '../mainProcess/ipc';
import { checkPath } from './fs';

const getRootDir = () => parameters.get('FMD_ROOT_DIR');
const isFmd = path => startsWith(getRootDir(), path);
const getRelativeFmdPath = path => `/${relative(getRootDir(), path)}`;

// TODO: write tests
const resolveDocument = ipcApi => (oId, callback) => {
  ipcApi.server.requestFmdGet(oId, ({ err, type, detail }) => {
    if (err) {
      return callback(err);
    }
    if (type !== globalConstants.FMDFILETYPE_DOCUMENT) {
      return callback('document is not a file');
    }
    callback(
      null,
      join(getRootDir(), detail.dirname.value, detail.basename.value),
      detail.properties,
    );
  });
};

// TODO: write tests
const createDocument = ipcApi => (path, documentType, callback) => {
  const mimeType = mimeTypes[documentType];
  if (!mimeType) {
    return callback(`Unknown documentType : ${documentType}`);
  }
  const fileName = basename(path);
  const folder = dirname(getRelativeFmdPath(path));
  checkPath(path).then(() => callback(null))
    .catch(() => {
      ipcApi.server.requestFmdCreate(folder, fileName, mimeType, ({ err, serializedOid }) => {
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

const createFmdApi = (dep = ipc) => ({
  ...fmdApi,
  createDocument: createDocument(dep),
  resolveDocument: resolveDocument(dep),
});

export default { createFmdApi, ...createFmdApi() };
