import fs, { access, accessSync, mkdir, readFileSync } from 'fs';
import rimraf from 'rimraf';
import { join, resolve } from 'path';
import { compose, prop, split } from 'lodash/fp';
import sinon from 'sinon';

import { MIME_TYPES } from '../constants';

import { getTmpPath } from '../common/test';
import * as fmdApi from '../common/fmd';
import { readDocument, writeDocument } from './io';

const mockedCreateDocument = (path, documentType, cb) => {
  const mimeType = MIME_TYPES[documentType];
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
      expect(readDocument).toBeAFunction();
    });

    it('fails when cannot parse json', (done) => {
      global.testConfig.ISIS_DOCUMENTS_ROOT = resolve(__dirname);
      readDocument({ pageFolder: __dirname, path: './index.js' }, (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toMatch(/Unexpected token/);
        global.testConfig.ISIS_DOCUMENTS_ROOT = folder;
        done();
      });
    });

    describe('inside fmd folder', () => {
      it('works with oid', (done) => {
        readDocument({ oId: 'oid:/small.workspace.json' }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toEqual(42);
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknow oid', (done) => {
        readDocument({ oId: 'unknownOid' }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      it('works with absolute path', (done) => {
        const absolutePath = join(folder, 'pages/page1.json');
        readDocument({ absolutePath }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown absolute path', (done) => {
        const absolutePath = join(folder, 'unknown.json');
        readDocument({ absolutePath }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      it('works with relative path', (done) => {
        const path = 'views/text1.json';
        readDocument({ pageFolder: folder, path }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown relative path', (done) => {
        const path = 'views/unknown.json';
        readDocument({ pageFolder: folder, path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      it('works with relative fmd path', (done) => {
        const path = '/views/text1.json';
        readDocument({ path }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown relative fmd path', (done) => {
        const path = '/views/unknown.json';
        readDocument({ path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
    });

    describe('outside fmd folder', () => {
      beforeAll(() => {
        global.testConfig.ISIS_DOCUMENTS_ROOT = resolve(__dirname, '../../data');
      });
      afterAll(() => {
        global.testConfig.ISIS_DOCUMENTS_ROOT = folder;
      });
      it('works with absolute path', (done) => {
        const absolutePath = join(folder, 'pages/page1.json');
        readDocument({ absolutePath }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown absolute path', (done) => {
        const absolutePath = join(folder, 'unknown.json');
        readDocument({ absolutePath }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      it('works with relative path', (done) => {
        const path = 'views/text1.json';
        readDocument({ pageFolder: folder, path }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown relative path', (done) => {
        const path = 'views/unknown.json';
        readDocument({ pageFolder: folder, path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      it('works with relative fmd path', (done) => {
        const path = '../fixtures/views/text1.json';
        readDocument({ path, pageFolder: folder }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown relative fmd path', (done) => {
        const path = '/../lib/documentManager/fixtures/views/unknown.json';
        readDocument({ path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
    });
  });
  describe('writeDocument', () => {
    const objectToSave = { type: 'WorkSpace', some: { properties: true } };
    const failingObjectToSave = { type: 'Unknown document type', some: { properties: true } };
    const readJsonFileSync = compose(JSON.parse, readFileSync);

    beforeEach(done => mkdir(getTmpPath(), done));
    afterEach(done => rimraf(getTmpPath(), done));

    it('exists', () => {
      expect(writeDocument).toBeAFunction();
    });

    it('fails when writeFile give an error', (done) => {
      global.testConfig.ISIS_DOCUMENTS_ROOT = '/';
      const path = join(fmdApi.getRootDir(), 'document.json');
      writeDocument(path, objectToSave, (err) => {
        expect(err).toBeAnObject();
        expect(err).toHaveKeys(['errno', 'code', 'syscall']);
        global.testConfig.ISIS_DOCUMENTS_ROOT = folder;
        done();
      });
    });

    it('fails when createDocument give an error', (done) => {
      const path = join(fmdApi.getRootDir(), 'document.json');
      writeDocument(path, failingObjectToSave, (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toMatch(/Unknown documentType/);
        done();
      });
    });

    describe('inside fmd folder', () => {
      beforeAll(() => {
        global.testConfig.ISIS_DOCUMENTS_ROOT = getTmpPath();
      });
      afterAll(() => {
        global.testConfig.ISIS_DOCUMENTS_ROOT = folder;
      });

      const getPath = () => join(fmdApi.getRootDir(), 'document.json');
      it('works with an absolute path', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(readJsonFileSync(path)).toEqual(objectToSave);
          done();
        });
      });
      it('should give an oid', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err, oid) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(oid).toEqual('oid:/document.json');
          done();
        });
      });
      it('fails with a relative path', (done) => {
        const path = './document.json';
        writeDocument(path, objectToSave, (err) => {
          expect(err).toBeInstanceOf(Error);
          access(path, (accessErr) => {
            expect(accessErr).toBeAnObject();
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
          expect(err).not.toBeInstanceOf(Error);
          expect(readJsonFileSync(path)).toEqual(objectToSave);
          done();
        });
      });
      it('should give an oid', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err, oid) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(oid).toBeUndefined();
          done();
        });
      });
      it('fails with a relative path', (done) => {
        const path = './document.json';
        writeDocument(path, objectToSave, (err) => {
          expect(err).toBeInstanceOf(Error);
          access(path, (accessErr) => {
            expect(accessErr).toBeAnObject();
            done();
          });
        });
      });
    });
  });
});
