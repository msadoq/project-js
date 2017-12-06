import { join } from 'path';
import _ from 'lodash/fp';
import startsWith from 'lodash/fp/startsWith';

import { isExists } from 'common/fs';
import * as fmd from './fmd';

export const resolveFmdPath = (path, cb) => {
  if (!_.startsWith('/', path)) {
    return cb(new Error(`Invalid FMD path ${path}`), {}); // TODO test this branch
  }
  const resolvedPath = join(fmd.getRootDir(), path);
  return isExists(resolvedPath, (exist) => {
    if (exist) {
      return cb(null, { resolvedPath });
    }
    return cb(null, { resolvedPath: path });
  });
};

export const resolveOid = (oId, cb) => (
  fmd.resolveDocument(oId, (resErr, resolvedPath, properties) => {
    if (resErr) {
      return cb(resErr, {});
    }
    return resolveFmdPath(resolvedPath, (err, infoResolved) => {
      if (err) {
        return cb(err, {}); // TODO test this branch
      }
      return cb(null, { ...infoResolved, properties });
    });
  })
);

export default ({ folder, relativePath, oId, absolutePath }, cb) => {
  const rootDir = folder || fmd.getRootDir();
  if (absolutePath) {
    return cb(null, { resolvedPath: absolutePath });
  }
  if (oId) {
    return resolveOid(oId, cb);
  }
  if (rootDir && (!startsWith('/', relativePath))) {
    return cb(null, { resolvedPath: join(rootDir, relativePath) });
  }
  if (!fmd.getRootDir()) {
    return cb(new Error(`Unable to load document ${relativePath} due to no fmd support`), {}); // TODO test this branch
  }
  return resolveFmdPath(relativePath, cb);
};
