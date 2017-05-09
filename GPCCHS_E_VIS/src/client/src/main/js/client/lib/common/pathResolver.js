import { join } from 'path';
import _ from 'lodash/fp';
import startsWith from 'lodash/fp/startsWith';

import * as fmd from './fmd';
import { isExists } from './fs';

const resolveFmdPath = (path, cb) => {
  if (!_.startsWith('/', path)) {
    return cb(new Error(`Invalid FMD path ${path}`), {});
  }
  const fmdPath = join(fmd.getRootDir(), path);
  return isExists(fmdPath, (exist) => {
    if (exist) {
      return cb(null, { path: fmdPath, resolution: 'fmd' });
    }
    return cb(null, { path, resolution: 'absolute' });
  });
};

export default ({ folder, relativePath, oId, absolutePath }, cb) => {
  if (absolutePath) {
    return cb(null, { path: absolutePath, resolution: 'absolute' });
  }
  if (oId) {
    return fmd.resolveDocument(oId, (resErr, resolvedPath, properties) => {
      if (resErr) {
        return cb(resErr, {});
      }
      return resolveFmdPath(resolvedPath, (err, { path }) => {
        if (err) {
          return cb(err, {});
        }
        return cb(null, { path, properties, resolution: 'oId' });
      });
    });
  }
  if (folder && (!startsWith('/', relativePath))) {
    return cb(null, { path: join(folder, relativePath), resolution: 'relative' });
  }
  if (!fmd.getRootDir()) {
    return cb(new Error(`Unable to load document ${relativePath} due to no fmd support`), {});
  }
  return resolveFmdPath(relativePath, cb);
};
