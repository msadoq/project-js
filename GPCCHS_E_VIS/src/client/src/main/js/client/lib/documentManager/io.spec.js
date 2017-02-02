import { join, resolve } from 'path';
import { compose, prop, split } from 'lodash/fp';

import mimeTypes from 'common/constants/mimeTypes';

import { should, expect } from '../common/test';
// import { should, expect, getTmpPath } from '../common/test';
import fmdApi from '../common/fmd';
import * as IO from './io';
import { applyDependencyToApi } from '../common/utils';

const getPathFromOid = compose(prop(1), split(':'));
const mockFmdApi = fmd => ({
  ...fmd,
  resolveDocument: (oid, cb) => {
    const resolvedPath = getPathFromOid(oid);
    if (!resolvedPath) {
      return cb(new Error('no resolved path'));
    }
    return cb(null, resolvedPath, 42);
  },
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
  const folder = fmdApi.getRootDir();
  describe('readDocument', () => {
    it('exists', (done) => {
      readDocument.should.be.a('function');
      done();
    });
    describe('inside fmd folder', () => {
      it('works with oid', (done) => {
        readDocument(null, null, 'oid:/small.workspace.json', null, (err, data, properties) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          properties.should.be.eql(42);
        });
        done();
      });
      it('fails with unknow oid', (done) => {
        readDocument(null, null, 'unknownOid', null, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
      it('works with absolute path', (done) => {
        const absolutePath = join(folder, 'pages/page1.json');
        readDocument(null, null, null, absolutePath, (err, data, properties) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          done();
        });
      });
      it('fails with unknown absolute path', (done) => {
        const absolutePath = join(folder, 'unknown.json');
        readDocument(null, null, null, absolutePath, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
      it('works with relative path', (done) => {
        const relativePath = 'views/text1.json';
        readDocument(folder, relativePath, null, null, (err, data, properties) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          done();
        });
      });
      it('fails with unknown relative path', (done) => {
        const relativePath = 'views/unknown.json';
        readDocument(folder, relativePath, null, null, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
      it('works with relative fmd path', (done) => {
        const relativePath = '/views/text1.json';
        readDocument(null, relativePath, null, null, (err, data, properties) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          done();
        });
      });
      it('fails with unknown relative fmd path', (done) => {
        const relativePath = '/views/unknown.json';
        readDocument(null, relativePath, null, null, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
    });
    describe('outside fmd folder', () => {
      before(() => {
        process.env.FMD_ROOT_DIR = resolve(__dirname, '../../data');
      });
      after(() => {
        process.env.FMD_ROOT_DIR = folder;
      });
      it('works with absolute path', (done) => {
        const absolutePath = join(folder, 'pages/page1.json');
        readDocument(null, null, null, absolutePath, (err, data, properties) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          done();
        });
      });
      it('fails with unknown absolute path', (done) => {
        const absolutePath = join(folder, 'unknown.json');
        readDocument(null, null, null, absolutePath, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
      it('works with relative path', (done) => {
        const relativePath = 'views/text1.json';
        readDocument(folder, relativePath, null, null, (err, data, properties) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          done();
        });
      });
      it('fails with unknown relative path', (done) => {
        const relativePath = 'views/unknown.json';
        readDocument(folder, relativePath, null, null, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
      it('works with relative fmd path', (done) => {
        const relativePath = '/../lib/documentManager/fixtures/views/text1.json';
        readDocument(null, relativePath, null, null, (err, data, properties) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          done();
        });
      });
      it('fails with unknown relative fmd path', (done) => {
        const relativePath = '/../lib/documentManager/fixtures/views/unknown.json';
        readDocument(null, relativePath, null, null, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
    });
  });
  describe('writeDocument', () => {
    it('exists', (done) => {
      writeDocument.should.be.a('function');
      done();
    });
  });
});
