import { join } from 'path';
import _ from 'lodash/fp';
import startsWith from 'lodash/fp/startsWith';

import * as fmd from './fmd';
import { isExists } from '../common/fs';

export const resolveFmdPath = (path, cb) => {
  if (!_.startsWith('/', path)) {
    return cb(new Error(`Invalid FMD path ${path}`), {});
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
        return cb(err, {});
      }
      return cb(null, { ...infoResolved, properties });
    });
  })
);

export default ({ folder, relativePath, oId, absolutePath }, cb) => {
  if (absolutePath) {
    return cb(null, { resolvedPath: absolutePath });
  }
  if (oId) {
    return resolveOid(oId, cb);
  }
  if (folder && (!startsWith('/', relativePath))) {
    return cb(null, { resolvedPath: join(folder, relativePath) });
  }
  if (!fmd.getRootDir()) {
    return cb(new Error(`Unable to load document ${relativePath} due to no fmd support`), {});
  }
  return resolveFmdPath(relativePath, cb);
};
