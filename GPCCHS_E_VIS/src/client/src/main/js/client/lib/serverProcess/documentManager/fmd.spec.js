// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 03/08/2017 : Refacto onFmdCreateData and onFmdGetData dc
//  controllers
// VERSION : 1.1.2 : FA : #7434 : 22/08/2017 : Update FMD create document test and stub
// VERSION : 1.1.2 : FA : #7434 : 25/08/2017 : Rollback remove '/' on FMD create document
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { get } from 'common/configurationManager';
import * as fmdApi from './fmd';

jest.mock('../ipc', () => ({
  dc: {
    sendProductLog: x => x,
    requestFmdGet: (oId, cb) => cb({
      err: oId === 'oid:error' ? new Error() : null,
      type: oId === 'oid:typeError' ? 'unknownType' : 2,
      detail: {
        dirname: { value: 'a/b/c' },
        basename: { value: 'document.json' },
        properties: true,
      },
    }),
    requestFmdCreate: (fileName, folder, mimeType, cb) => cb({
      err: fileName === 'filename:error' ? new Error() : null,
      serializedOid: fileName === 'filename:error' ? undefined : 4242,
    }),
  },
}));

describe('common/fmd', () => {
  describe('getRootDir', () => {
    test('should return same thing than parameters.get', () => {
      expect(fmdApi.getRootDir()).toEqual(get('ISIS_DOCUMENTS_ROOT'));
    });
  });

  describe('isInFmd', () => {
    // isInFmd do not check fs for existing path,
    // it's just function that check if path start with fmd root dir.
    test('should be true', () => {
      expect(fmdApi.isInFmd(`${fmdApi.getRootDir()}/missing`)).toEqual(true);
      expect(fmdApi.isInFmd(fmdApi.getRootDir())).toEqual(true);
    });
    test('should be false', () => {
      expect(fmdApi.isInFmd('/')).toEqual(false);
    });
  });

  describe('getRelativeFmdPath', () => {
    test('should return relative fmd path (starting with \'/\')', () => {
      expect(fmdApi.getRelativeFmdPath(fmdApi.getRootDir())).toEqual('/');
      expect(fmdApi.getRelativeFmdPath(`${fmdApi.getRootDir()}/..`)).toEqual('/..');
      expect(fmdApi.getRelativeFmdPath(`${fmdApi.getRootDir()}/yolo`)).toEqual('/yolo');
      expect(fmdApi.getRelativeFmdPath(`${fmdApi.getRootDir()}/../fixtures/yolo`)).toEqual('/yolo');
    });
  });

  describe('createDocument', () => {
    const fileName = 'newDocument.json';
    const validPath = `${fmdApi.getRootDir()}/${fileName}`;
    test('should be defined', () => {
      expect(fmdApi.createDocument).toBeDefined();
      expect(typeof fmdApi.createDocument).toBe('function');
    });
    test('give serializedOid by callback', (done) => {
      fmdApi.createDocument(validPath, 'WorkSpace', (err, oid) => {
        expect(oid).toEqual(4242);
        expect(typeof err).not.toBe('error');
        done();
      });
    });
    test('give an error when documentType is unknown', (done) => {
      fmdApi.createDocument(validPath, 'unknownDocumentType', (err, oid) => {
        expect(oid).toBeUndefined();
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
    test('does nothing when path already exist', (done) => {
      fmdApi.createDocument('.', 'WorkSpace', (err, oid) => {
        expect(oid).toBeUndefined();
        expect(typeof err).not.toBe('error');
        done();
      });
    });
    test('give an error when ipc fail', (done) => {
      fmdApi.createDocument('./filename:error', 'WorkSpace', (err, oid) => {
        expect(oid).toBeUndefined();
        expect(err).toBeAnError();
        done();
      });
    });
  });

  describe('resolveDocument', () => {
    test('resolveDocument should be defined', () => {
      expect(fmdApi.resolveDocument).toBeDefined();
      expect(typeof fmdApi.resolveDocument).toBe('function');
    });
    test('give resolved filePath with properties', (done) => {
      fmdApi.resolveDocument('oid', (err, filePath, properties) => {
        expect(typeof err).not.toBe('error');
        expect(filePath).toEqual(`${fmdApi.getRootDir()}/a/b/c/document.json`);
        expect(properties).toBe(true);
        done();
      });
    });
    test('give an error when responded type is not a valid document', (done) => {
      fmdApi.resolveDocument('oid:typeError', (err, filePath, properties) => {
        expect(err).toBeInstanceOf(Error);
        expect(filePath).toBeUndefined();
        expect(properties).toBeUndefined();
        done();
      });
    });
    test('give an error when ipc failed', (done) => {
      fmdApi.resolveDocument('oid:error', (err, filePath, properties) => {
        expect(err).toBeInstanceOf(Error);
        expect(filePath).toBeUndefined();
        expect(properties).toBeUndefined();
        done();
      });
    });
  });
});
