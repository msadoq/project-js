import { access, mkdir, readFileSync } from 'fs';
import rimraf from 'rimraf';
import { join, resolve } from 'path';
import { compose, prop, split } from 'lodash/fp';

import mimeTypes from 'common/constants/mimeTypes';

import { sinon, should, expect, getTmpPath } from '../common/test';
import * as fmdApi from '../common/fmd';
import { readDocument, writeDocument } from './io';

const mockedCreateDocument = (path, documentType, cb) => {
  const mimeType = mimeTypes[documentType];
  if (!mimeType) {
    return cb(new Error(`Unknown documentType : ${documentType}`));
  }
  const oid = `oid:${fmdApi.getRelativeFmdPath(path)}`;
  return cb(null, oid);
};

const mockedResolveDocument = (oid, cb) => {
  const getPathFromOid = compose(prop(1), split(':'));
  const resolvedPath = getPathFromOid(oid);
  if (!resolvedPath) {
    return cb(new Error('no resolved path'));
  }
  return cb(null, resolvedPath, 42);
};

describe('documentManager/io', () => {
  const folder = fmdApi.getRootDir();
  let stubCreateDocument;
  let stubResolveDocument;
  before(() => {
    stubCreateDocument = sinon.stub(fmdApi, 'createDocument', mockedCreateDocument);
    stubResolveDocument = sinon.stub(fmdApi, 'resolveDocument', mockedResolveDocument);
  });
  after(() => {
    stubCreateDocument.restore();
    stubResolveDocument.restore();
  });
  describe('readDocument', () => {
    it('exists', () => {
      readDocument.should.be.a('function');
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
        process.env.ISIS_DOCUMENTS_ROOT = resolve(__dirname, '../../data');
      });
      after(() => {
        process.env.ISIS_DOCUMENTS_ROOT = folder;
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
        const relativePath = '/../fixtures/views/text1.json';
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
    const objectToSave = { type: 'WorkSpace', some: { properties: true } };
    const readJsonFileSync = compose(JSON.parse, readFileSync);

    beforeEach(done => mkdir(getTmpPath(), done));
    afterEach(done => rimraf(getTmpPath(), done));

    it('exists', () => {
      writeDocument.should.be.a('function');
    });

    describe('inside fmd folder', () => {
      before(() => {
        process.env.ISIS_DOCUMENTS_ROOT = getTmpPath();
      });
      after(() => {
        process.env.ISIS_DOCUMENTS_ROOT = folder;
      });

      const getPath = () => join(fmdApi.getRootDir(), 'document.json');

      it('works with an absolute path', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err) => {
          expect(err).to.not.be.an('error');
          expect(readJsonFileSync(path)).to.be.eql(objectToSave);
          done();
        });
      });
      it('should give an oid', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err, oid) => {
          expect(err).to.not.be.an('error');
          expect(oid).to.be.eql('oid:/document.json');
          done();
        });
      });
      it('fails with a relative path', (done) => {
        const path = './document.json';
        writeDocument(path, objectToSave, (err) => {
          expect(err).to.be.an('error');
          access(path, (accessErr) => {
            expect(accessErr).to.be.an('error');
            done();
          });
        });
      });
    });

    describe('outside fmd folder', () => {
      const getPath = () => join(getTmpPath(), 'document.json');

      it('works with an absolute path', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err) => {
          expect(err).to.not.be.an('error');
          expect(readJsonFileSync(path)).to.be.eql(objectToSave);
          done();
        });
      });
      it('should give an oid', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err, oid) => {
          expect(err).to.not.be.an('error');
          expect(oid).to.be.an('undefined');
          done();
        });
      });
      it('fails with a relative path', (done) => {
        const path = './document.json';
        writeDocument(path, objectToSave, (err) => {
          expect(err).to.be.an('error');
          access(path, (accessErr) => {
            expect(accessErr).to.be.an('error');
            done();
          });
        });
      });
    });
  });
});
