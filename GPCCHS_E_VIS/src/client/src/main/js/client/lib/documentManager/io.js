import fs from 'fs';
import startsWith from 'lodash/fp/startsWith';

import * as fmd from '../common/fmd';

import resolvePath from '../common/pathResolver';
import { read, parse } from '../common/fs';

export const readDocument = (folder, relativePath, oId, absolutePath, callback) => (
  resolvePath({ folder, relativePath, oId, absolutePath }, (err, { path, properties }) => {
    if (err) {
      return callback(err, {});
    }
    return read(path, (readErr, content) => {
      if (readErr) {
        return callback(readErr);
      }
      return parse(content, (parseErr, parsedJson) => {
        if (parseErr) {
          return callback(parseErr);
        }
        return callback(null, parsedJson, properties);
      });
    });
  })
);

export const writeDocument = (path, json, callback) => {
  const spaces = 2; // beautify json with 2 spaces indentations
  const data = JSON.stringify(json, null, spaces);
  if (!startsWith('/', path)) {
    return callback(new Error('path should be absolute'));
  }
  if (fmd.isInFmd(path)) {
    return fmd.createDocument(path, json.type, (err, oid) => {
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
