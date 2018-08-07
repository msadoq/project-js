// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import fs, { access, accessSync, mkdir, readFileSync } from 'fs';
import rimraf from 'rimraf';
import { join, resolve } from 'path';
import { compose, prop, split } from 'lodash/fp';
import sinon from 'sinon';

import { MIME_TYPES } from 'constants';

import { getTmpPath } from 'common/jest';
import { CSV_DATA as CSV_EXPORT_DATA } from './fixtures/exportData';
import * as fmdApi from './fmd';
import * as io from './io';

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
    test('exists', () => {
      expect(io.readDocument).toBeAFunction();
    });

    test('fails when cannot parse json', (done) => {
      global.testConfig.ISIS_DOCUMENTS_ROOT = resolve(__dirname);
      io.readDocument({ pageFolder: __dirname, path: './index.js' }, (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toMatch(/Unexpected token/);
        global.testConfig.ISIS_DOCUMENTS_ROOT = folder;
        done();
      });
    });

    describe('inside fmd folder', () => {
      test.skip('works with oid', (done) => {
        io.readDocument({ oId: 'oid:/small.workspace.json' },
          (err, data, properties, resolvedPath) => {
            expect(err).not.toBeInstanceOf(Error);
            expect(data).toBeAnObject();
            expect(properties).toEqual(42);
            expect(resolvedPath).toBeAString();
            expect(fileExist(resolvedPath)).toBe(true);
            done();
          });
      });
      test('fails with unknow oid', (done) => {
        io.readDocument({ oId: 'unknownOid' }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      test.skip('works with absolute path', (done) => {
        const absolutePath = join(folder, 'pages/page1.json');
        io.readDocument({ absolutePath }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      test('fails with unknown absolute path', (done) => {
        const absolutePath = join(folder, 'unknown.json');
        io.readDocument({ absolutePath }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      test.skip('works with relative path', (done) => {
        const path = 'views/text1.json';
        io.readDocument({ pageFolder: folder, path }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      test('fails with unknown relative path', (done) => {
        const path = 'views/unknown.json';
        io.readDocument({ pageFolder: folder, path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      test.skip('works with relative fmd path', (done) => {
        const path = '/views/text1.json';
        io.readDocument({ path }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      test('fails with unknown relative fmd path', (done) => {
        const path = '/views/unknown.json';
        io.readDocument({ path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
    });

    describe.skip('outside fmd folder', () => {
      beforeAll(() => {
        global.testConfig.ISIS_DOCUMENTS_ROOT = resolve(__dirname, '../../data');
      });
      afterAll(() => {
        global.testConfig.ISIS_DOCUMENTS_ROOT = folder;
      });
      test('works with absolute path', (done) => {
        const absolutePath = join(folder, 'pages/page1.json');
        io.readDocument({ absolutePath }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      test('fails with unknown absolute path', (done) => {
        const absolutePath = join(folder, 'unknown.json');
        io.readDocument({ absolutePath }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      test('works with relative path', (done) => {
        const path = 'views/text1.json';
        io.readDocument({ pageFolder: folder, path }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      test('fails with unknown relative path', (done) => {
        const path = 'views/unknown.json';
        io.readDocument({ pageFolder: folder, path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      test('works with relative fmd path', (done) => {
        const path = '../fixtures/views/text1.json';
        io.readDocument({ path, pageFolder: folder }, (err, data, properties, resolvedPath) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(data).toBeAnObject();
          expect(properties).toBeFalsy();
          expect(resolvedPath).toBeAString();
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      test('fails with unknown relative fmd path', (done) => {
        const path = '/../lib/documentManager/fixtures/views/unknown.json';
        io.readDocument({ path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
    });
  });

  describe('readDocumentType', () => {
    test('get the document type', (done) => {
      const path = '../fixtures/views/text1.json';
      io.readDocumentType({ path, pageFolder: folder }, (err, type) => {
        expect(type).toBe('TextView');
        done();
      });
    });
    test('get an error when read document', (done) => {
      const path = '../fixtures/views/text.json';
      io.readDocumentType({ path }, (err) => {
        expect(err).toBeAnError();
        done();
      });
    });
    test('get an error if readed document has no type', (done) => {
      const path = '../../../../package.json';
      io.readDocumentType({ path, pageFolder: folder }, (err) => {
        expect(err).toBeAnError();
        expect(err.message).toMatch(/no type/);
        done();
      });
    });
  });

  describe('writeDocument', () => {
    const objectToSave = { type: 'WorkSpace', some: { properties: true } };
    const failingObjectToSave = { type: 'Unknown document type', some: { properties: true } };
    const readJsonFileSync = compose(JSON.parse, readFileSync);

    beforeEach(done => mkdir(getTmpPath(), done));
    afterEach(done => rimraf(getTmpPath(), done));

    test('writeDocument: written file exists', () => {
      expect(io.writeDocument).toBeAFunction();
    });

    test('writeDocument fails when writeFile give an error', (done) => {
      global.testConfig.ISIS_DOCUMENTS_ROOT = '/';
      const path = join(fmdApi.getRootDir(), 'document.json');
      io.writeDocument(path, objectToSave, (err) => {
        expect(err).toBeAnObject();
        expect(err).toHaveKeys(['errno', 'code', 'syscall']);
        global.testConfig.ISIS_DOCUMENTS_ROOT = folder;
        done();
      });
    });

    test('writeDocument fails when createDocument give an error', (done) => {
      const path = join(fmdApi.getRootDir(), 'document.json');
      io.writeDocument(path, failingObjectToSave, (err) => {
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

      test('writeDocument works with an absolute path', (done) => {
        const path = getPath();
        io.writeDocument(path, objectToSave, (err) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(readJsonFileSync(path)).toEqual(objectToSave);
          done();
        });
      });

      test('writeDocument should give an oid', (done) => {
        const path = getPath();
        io.writeDocument(path, objectToSave, (err, oid) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(oid).toEqual('oid:/document.json');
          done();
        });
      });

      test('writeDocument fails with a relative path', (done) => {
        const path = './document.json';
        io.writeDocument(path, objectToSave, (err) => {
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

      test('writeDocument works with an absolute path', (done) => {
        const path = getPath();
        io.writeDocument(path, objectToSave, (err) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(readJsonFileSync(path)).toEqual(objectToSave);
          done();
        });
      });

      test('writeDocument should give an oid', (done) => {
        const path = getPath();
        io.writeDocument(path, objectToSave, (err, oid) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(oid).toBeUndefined();
          done();
        });
      });
      test('writeDocument fails with a relative path', (done) => {
        const path = './document.json';
        io.writeDocument(path, objectToSave, (err) => {
          expect(err).toBeInstanceOf(Error);
          access(path, (accessErr) => {
            expect(accessErr).toBeAnObject();
            done();
          });
        });
      });
    });
  });

  describe('exportData --- csv', () => {
    const failingObjectToSave = { type: 'Unknown document type', some: { properties: true } };

    beforeEach(done => mkdir(getTmpPath(), done));
    afterEach(done => rimraf(getTmpPath(), done));

    test('written file exists', () => {
      expect(io.exportData).toBeAFunction();
    });

    test('fails when writeFile gives an error', (done) => {
      global.testConfig.ISIS_DOCUMENTS_ROOT = '/';
      const path = join(fmdApi.getRootDir(), 'filename.csv');
      io.exportData(CSV_EXPORT_DATA, MIME_TYPES.CommaSeparatedValues, path, (err) => {
        expect(err).toBeAnObject();
        expect(err).toHaveKeys(['errno', 'code', 'syscall']);
        global.testConfig.ISIS_DOCUMENTS_ROOT = folder;
        done();
      });
    });

    test('fails when createDocument gives an error', (done) => {
      const path = join(fmdApi.getRootDir(), 'filename.csv');
      io.exportData(CSV_EXPORT_DATA, failingObjectToSave, path, (err) => {
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

      const getExportDataPath = () => join(fmdApi.getRootDir(), 'document.csv');

      test('works with an absolute path', (done) => {
        const exportDataPath = getExportDataPath();
        io.exportData(CSV_EXPORT_DATA, MIME_TYPES.CommaSeparatedValues, exportDataPath, (err) => {
          expect(err).not.toBeInstanceOf(Error);
          fs.readFile(exportDataPath, 'utf8', (error, data) => {
            if (error) throw error;
            expect(data).toEqual(CSV_EXPORT_DATA);
            done();
          });
          done();
        });
      });

      test('should give an oid', (done) => {
        const path = getExportDataPath();
        io.exportData(CSV_EXPORT_DATA, MIME_TYPES.CommaSeparatedValues, path, (err, oid) => {
          expect(err).not.toBeInstanceOf(Error);
          expect(oid).toEqual('oid:/document.csv');
          done();
        });
      });

      test('fails with a relative path', (done) => {
        const path = './document.csv';
        io.exportData(CSV_EXPORT_DATA, MIME_TYPES.CommaSeparatedValues, path, (err) => {
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
      const getExportDataPath = () => join(getTmpPath(), 'document.csv');

      test('exportData works with an absolute path', (done) => {
        const exportDataPath = getExportDataPath();
        io.exportData(CSV_EXPORT_DATA, MIME_TYPES.CommaSeparatedValues, exportDataPath, (err) => {
          expect(err).not.toBeInstanceOf(Error);
          fs.readFile(exportDataPath, 'utf8', (error, data) => {
            if (error) throw error;
            expect(data).toEqual(CSV_EXPORT_DATA);
            done();
          });
          done();
        });
      });
      test('should give an oid', (done) => {
        const exportDataPath = getPath();
        io.exportData(CSV_EXPORT_DATA, MIME_TYPES.CommaSeparatedValues, exportDataPath,
          (err, oid) => {
            expect(err).not.toBeInstanceOf(Error);
            expect(oid).toBeUndefined();
            done();
          });
      });
      test('fails with a relative path', (done) => {
        const exportDataPath = './document.csv';
        io.exportData(CSV_EXPORT_DATA, MIME_TYPES.CommaSeparatedValues, exportDataPath, (err) => {
          expect(err).toBeInstanceOf(Error);
          access(exportDataPath, (accessErr) => {
            expect(accessErr).toBeAnObject();
            done();
          });
        });
      });
    });
  });

  describe('exportData --- png', () => {
    const failingObjectToSave = { type: 'Unknown document type', some: { properties: true } };
    const pngDataUrlImportPath = `${__dirname}/fixtures/pngDataUrl`;
    const pngDataUrl = String(fs.readFileSync(pngDataUrlImportPath));

    beforeEach(done => mkdir(getTmpPath(), done));
    afterEach(done => rimraf(getTmpPath(), done));

    test('written file exists', () => {
      expect(io.exportData).toBeAFunction();
    });

    test('fails when writeFile gives an error', (done) => {
      global.testConfig.ISIS_DOCUMENTS_ROOT = '/';
      const path = join(fmdApi.getRootDir(), 'filename.png');
      io.exportData(pngDataUrl, MIME_TYPES.PortableNetworkGraphics, path, (err) => {
        expect(err).toBeAnObject();
        expect(err).toHaveKeys(['errno', 'code', 'syscall']);
        global.testConfig.ISIS_DOCUMENTS_ROOT = folder;
        done();
      });
    });

    test('fails when createDocument gives an error', (done) => {
      const path = join(fmdApi.getRootDir(), 'filename.png');
      io.exportData(pngDataUrl, failingObjectToSave, path, (err) => {
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

      const getExportDataPath = () => join(fmdApi.getRootDir(), 'document.png');
      test('works with an absolute path', (done) => {
        const exportDataPath = getExportDataPath();
        io.exportData(pngDataUrl, MIME_TYPES.PortableNetworkGraphics, exportDataPath, (err) => {
          expect(err).not.toBeInstanceOf(Error);
          fs.readFile(exportDataPath, 'base64', (error, data) => {
            if (error) throw error;
            expect(data).toEqual(pngDataUrl);
            done();
          });
          done();
        });
      });

      test('should give an oid', (done) => {
        const exportDataPath = getExportDataPath();
        io.exportData(pngDataUrl, MIME_TYPES.PortableNetworkGraphics, exportDataPath,
          (err, oid) => {
            expect(err).not.toBeInstanceOf(Error);
            expect(oid).toEqual('oid:/document.png');
            done();
          });
      });

      test('fails with a relative path', (done) => {
        const exportDataPath = './document.png';
        io.exportData(pngDataUrl, MIME_TYPES.PortableNetworkGraphics, exportDataPath,
          (err) => {
            expect(err).toBeInstanceOf(Error);
            access(exportDataPath, (accessErr) => {
              expect(accessErr).toBeAnObject();
              done();
            });
          });
      });
    });

    describe('outside fmd folder', () => {
      const getExportDataPath = () => join(getTmpPath(), 'document.png');
      test('exportData works with an absolute path', (done) => {
        const exportDataPath = getExportDataPath();
        io.exportData(pngDataUrl, MIME_TYPES.PortableNetworkGraphics, exportDataPath, (err) => {
          expect(err).not.toBeInstanceOf(Error);
          fs.readFile(exportDataPath, 'base64', (error, data) => {
            if (error) throw error;
            expect(data).toEqual(pngDataUrl);
            done();
          });
          done();
        });
      });
      test('should give an oid', (done) => {
        const exportDataPath = getExportDataPath();
        io.exportData(pngDataUrl, MIME_TYPES.PortableNetworkGraphics, exportDataPath,
          (err, oid) => {
            expect(err).not.toBeInstanceOf(Error);
            expect(oid).toBeUndefined();
            done();
          });
      });
      test('fails with a relative path', (done) => {
        const exportDataPath = './document.png';
        io.exportData(pngDataUrl, MIME_TYPES.PortableNetworkGraphics, exportDataPath, (err) => {
          expect(err).toBeInstanceOf(Error);
          access(exportDataPath, (accessErr) => {
            expect(accessErr).toBeAnObject();
            done();
          });
        });
      });
    });
  });
});
