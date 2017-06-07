/* eslint-disable no-unused-expressions */
import { get } from 'common/parameters';
import globalConstants from 'common/constants';
import * as fmdApi from './fmd';
import ipcApi from '../mainProcess/ipc';
import { sinon } from './test';

const mockedRequestFmdCreate = (folder, fileName, mimeType, cb) => cb({
  err: fileName === 'filename:error' ? new Error() : null,
  serializedOid: 4242,
});

const mockedRequestFmdGet = (oId, cb) => cb({
  err: oId === 'oid:error' ? new Error() : null,
  type: oId === 'oid:typeError' ? 'unknownType' : globalConstants.FMDFILETYPE_DOCUMENT,
  detail: {
    dirname: { value: 'a/b/c' },
    basename: { value: 'document.json' },
    properties: true,
  },
});

describe('common/fmd', () => {
  let stubs = [];
  beforeAll(() => {
    stubs = [
      sinon.stub(ipcApi.server, 'requestFmdCreate').callsFake(mockedRequestFmdCreate),
      sinon.stub(ipcApi.server, 'requestFmdGet').callsFake(mockedRequestFmdGet),
    ];
  });
  afterAll(() => {
    stubs.forEach(stub => stub.restore());
  });
  describe('getRootDir', () => {
    it('should return same thing than parameters.get', () => {
      expect(fmdApi.getRootDir()).toEqual(get('ISIS_DOCUMENTS_ROOT'));
    });
  });

  describe('isInFmd', () => {
    // isInFmd do not check fs for existing path,
    // it's just function that check if path start with fmd root dir.
    it('should be true', () => {
      expect(fmdApi.isInFmd(`${fmdApi.getRootDir()}/missing`)).toEqual(true);
      expect(fmdApi.isInFmd(fmdApi.getRootDir())).toEqual(true);
    });
    it('should be false', () => {
      expect(fmdApi.isInFmd('/')).toEqual(false);
    });
  });

  describe('getRelativeFmdPath', () => {
    it('should return relative fmd path (starting with \'/\')', () => {
      expect(fmdApi.getRelativeFmdPath(fmdApi.getRootDir())).toEqual('/');
      expect(fmdApi.getRelativeFmdPath(`${fmdApi.getRootDir()}/..`)).toEqual('/..');
      expect(fmdApi.getRelativeFmdPath(`${fmdApi.getRootDir()}/yolo`)).toEqual('/yolo');
      expect(fmdApi.getRelativeFmdPath(`${fmdApi.getRootDir()}/../fixtures/yolo`)).toEqual('/yolo');
    });
  });

  describe('createDocument', () => {
    const fileName = 'newDocument.json';
    const validPath = `${fmdApi.getRootDir()}/${fileName}`;
    it('should be defined', () => {
      expect(fmdApi.createDocument).toBeDefined();
      expect(typeof fmdApi.createDocument).toBe('function');
    });
    it('give serializedOid by callback', (done) => {
      fmdApi.createDocument(validPath, 'WorkSpace', (err, oid) => {
        expect(oid).toEqual(4242);
        expect(typeof err).not.toBe('error');
        const fn = ipcApi.server.requestFmdCreate;
        expect(fn.calledWith('/', fileName, 'WorkspaceDoc')).toBe(true);
        done();
      });
    });
    it('give an error when documentType is unknown', (done) => {
      fmdApi.createDocument(validPath, 'unknownDocumentType', (err, oid) => {
        expect(oid).toBeUndefined();
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
    it('does nothing when path already exist', (done) => {
      fmdApi.createDocument('.', 'WorkSpace', (err, oid) => {
        expect(oid).toBeUndefined();
        expect(typeof err).not.toBe('error');
        done();
      });
    });
    it('give an error when ipc fail', (done) => {
      fmdApi.createDocument('./filename:error', 'WorkSpace', (err, oid) => {
        expect(oid).toBeUndefined();
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
  });

  describe('resolveDocument', () => {
    it('resolveDocument should be defined', () => {
      expect(fmdApi.resolveDocument).toBeDefined();
      expect(typeof fmdApi.resolveDocument).toBe('function');
    });
    it('give resolved filePath with properties', (done) => {
      fmdApi.resolveDocument('oid', (err, filePath, properties) => {
        expect(typeof err).not.toBe('error');
        expect(filePath).toEqual(`${fmdApi.getRootDir()}/a/b/c/document.json`);
        expect(properties).toBe(true);
        expect(ipcApi.server.requestFmdGet.calledWith('oid')).toBe(true);
        done();
      });
    });
    it('give an error when responded type is not a valid document', (done) => {
      fmdApi.resolveDocument('oid:typeError', (err, filePath, properties) => {
        expect(err).toBeInstanceOf(Error);
        expect(filePath).toBeUndefined();
        expect(properties).toBeUndefined();
        expect(ipcApi.server.requestFmdGet.calledWith('oid')).toBe(true);
        done();
      });
    });
    it('give an error when ipc failed', (done) => {
      fmdApi.resolveDocument('oid:error', (err, filePath, properties) => {
        expect(err).toBeInstanceOf(Error);
        expect(filePath).toBeUndefined();
        expect(properties).toBeUndefined();
        expect(ipcApi.server.requestFmdGet.calledWith('oid')).toBe(true);
        done();
      });
    });
  });
});
