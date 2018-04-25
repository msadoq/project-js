// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import fs from 'fs';

import { read, parse } from 'common/fs';

import { MIME_TYPES } from 'constants';
import * as fmd from './fmd';

import resolvePath from './pathResolver';

export const readDocument = (
  { pageFolder, workspaceFolder, viewFolder, documentFolder, path, oId, absolutePath }, cb
) => {
  const folder = viewFolder || pageFolder || workspaceFolder || documentFolder;
  const relativePath = path;
  resolvePath({ folder, relativePath, oId, absolutePath }, (err, { resolvedPath, properties }) => {
    if (err) {
      return cb(err, {});
    }
    return read(resolvedPath, (readErr, content) => {
      if (readErr) {
        return cb(readErr);
      }
      return parse(content, (parseErr, parsedJson) => {
        if (parseErr) {
          return cb(parseErr);
        }
        return cb(null, parsedJson, properties, resolvedPath);
      });
    });
  });
};

export const readDocumentType = (docInfo, cb) => {
  readDocument(docInfo, (err, doc) => {
    if (err) {
      return cb(err);
    }
    if (!_.has('type', doc)) {
      return cb(new Error('The given document has no type'));
    }
    return cb(null, doc.type);
  });
};

export const writeDocument = (path, json, cb) => {
  const spaces = 2; // beautify json with 2 spaces indentations
  const data = JSON.stringify(json, null, spaces);
  if (!_.startsWith('/', path)) {
    return cb(new Error('path should be absolute'));
  }
  const writeFile = oid => fs.writeFile(path, data, (errWriting) => {
    if (errWriting) {
      return cb(errWriting);
    }
    return cb(null, oid);
  });
  if (fmd.isInFmd(path)) {
    return fmd.createDocument(path, json.type, (err, oid) => {
      if (err) {
        return cb(new Error(`FMD createDocument : ${err}`));
      }
      return writeFile(oid);
    });
  }
  return writeFile();
};

export const exportData = (content, contentType, path, callback) => {
  if (!_.startsWith('/', path)) {
    return callback(new Error('path should be absolute'));
  }
  const encoding = (type) => {
    switch (type) {
      case MIME_TYPES.PortableNetworkGraphics: {
        return 'base64';
      }
      case MIME_TYPES.CommaSeparatedValues: {
        return 'utf8';
      }
      default: {
        return 'utf8';
      }
    }
  };
  const writeFile = oid => fs.writeFile(path, content, encoding(contentType), (errWriting) => {
    if (errWriting) {
      return callback(errWriting);
    }
    return callback(null, oid);
  });
  if (fmd.isInFmd(path)) {
    return fmd.createDocument(path, contentType, (err, oid) => {
      if (err) {
        return callback(new Error(`FMD createDocument : ${err}`));
      }
      return writeFile(oid);
    });
  }
  return writeFile();
};
