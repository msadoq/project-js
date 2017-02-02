import { compose, prop, split } from 'lodash/fp';

import mimeTypes from 'common/constants/mimeTypes';

// import { should, expect } from '../common/test';
import { } from '../common/test';
import fmdApi from '../common/fmd';
import * as IO from './io';
import { applyDependencyToApi } from '../common/utils';

const getPathFromOid = compose(prop(1), split(':'));
const mockFmdApi = fmd => ({
  ...fmd,
  resolveDocument: (oid, cb) => cb(null, getPathFromOid(oid)),
  createDocument: (path, documentType, cb) => {
    const mimeType = mimeTypes[documentType];
    if (!mimeType) {
      return cb(`Unknown documentType : ${documentType}`);
    }
    const oid = `oid:${fmd.getRelativeFmdPath(path)}`;
    return cb(null, oid);
  },
});

const { readDocument, writeDocument } = applyDependencyToApi(IO, mockFmdApi(fmdApi));

describe('documentManager/io', () => {
  describe('readDocument', () => {
    it('exists', (done) => {
      readDocument.should.be.a('function');
      done();
    });
  });
  describe('writeDocument', () => {
    it('exists', (done) => {
      writeDocument.should.be.a('function');
      done();
    });
  });
});
