/* eslint-disable no-unused-expressions */
import fs, { access, accessSync, mkdir, readFileSync } from 'fs';
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

const fileExist = (path) => {
  try {
    accessSync(path, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};

describe('documentManager/io', () => {
  const folder = fmdApi.getRootDir();
  let stubCreateDocument;
  let stubResolveDocument;
  beforeAll(() => {
    stubCreateDocument = sinon.stub(fmdApi, 'createDocument').callsFake(mockedCreateDocument);
    stubResolveDocument = sinon.stub(fmdApi, 'resolveDocument').callsFake(mockedResolveDocument);
  });
  afterAll(() => {
    stubCreateDocument.restore();
    stubResolveDocument.restore();
  });
  describe('readDocument', () => {
    it('exists', () => {
      readDocument.should.be.a('function');
    });

    describe('inside fmd folder', () => {
      it('works with oid', (done) => {
        readDocument({ oId: 'oid:/small.workspace.json' }, (err, data, properties, resolvedPath) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          properties.should.be.eql(42);
          resolvedPath.should.be.a('string');
          fileExist(resolvedPath).should.be.true;
          done();
        });
      });
      it('fails with unknow oid', (done) => {
        readDocument({ oId: 'unknownOid' }, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
      it('works with absolute path', (done) => {
        const absolutePath = join(folder, 'pages/page1.json');
        readDocument({ absolutePath }, (err, data, properties, resolvedPath) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          resolvedPath.should.be.a('string');
          fileExist(resolvedPath).should.be.true;
          done();
        });
      });
      it('fails with unknown absolute path', (done) => {
        const absolutePath = join(folder, 'unknown.json');
        readDocument({ absolutePath }, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
      it('works with relative path', (done) => {
        const path = 'views/text1.json';
        readDocument({ pageFolder: folder, path }, (err, data, properties, resolvedPath) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          resolvedPath.should.be.a('string');
          fileExist(resolvedPath).should.be.true;
          done();
        });
      });
      it('fails with unknown relative path', (done) => {
        const path = 'views/unknown.json';
        readDocument({ pageFolder: folder, path }, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
      it('works with relative fmd path', (done) => {
        const path = '/views/text1.json';
        readDocument({ path }, (err, data, properties, resolvedPath) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          resolvedPath.should.be.a('string');
          fileExist(resolvedPath).should.be.true;
          done();
        });
      });
      it('fails with unknown relative fmd path', (done) => {
        const path = '/views/unknown.json';
        readDocument({ path }, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
    });

    describe('outside fmd folder', () => {
      beforeAll(() => {
        process.env.ISIS_DOCUMENTS_ROOT = resolve(__dirname, '../../data');
      });
      afterAll(() => {
        process.env.ISIS_DOCUMENTS_ROOT = folder;
      });
      it('works with absolute path', (done) => {
        const absolutePath = join(folder, 'pages/page1.json');
        readDocument({ absolutePath }, (err, data, properties, resolvedPath) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          resolvedPath.should.be.a('string');
          fileExist(resolvedPath).should.be.true;
          done();
        });
      });
      it('fails with unknown absolute path', (done) => {
        const absolutePath = join(folder, 'unknown.json');
        readDocument({ absolutePath }, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
      it('works with relative path', (done) => {
        const path = 'views/text1.json';
        readDocument({ pageFolder: folder, path }, (err, data, properties, resolvedPath) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          resolvedPath.should.be.a('string');
          fileExist(resolvedPath).should.be.true;
          done();
        });
      });
      it('fails with unknown relative path', (done) => {
        const path = 'views/unknown.json';
        readDocument({ pageFolder: folder, path }, (err) => {
          expect(err).to.be.an('error');
          done();
        });
      });
      it('works with relative fmd path', (done) => {
        const path = '/../fixtures/views/text1.json';
        readDocument({ path }, (err, data, properties, resolvedPath) => {
          expect(err).to.not.be.an('error');
          data.should.be.an('object');
          should.not.exist(properties);
          resolvedPath.should.be.a('string');
          fileExist(resolvedPath).should.be.true;
          done();
        });
      });
      it('fails with unknown relative fmd path', (done) => {
        const path = '/../lib/documentManager/fixtures/views/unknown.json';
        readDocument({ path }, (err) => {
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
      beforeAll(() => {
        process.env.ISIS_DOCUMENTS_ROOT = getTmpPath();
      });
      afterAll(() => {
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
