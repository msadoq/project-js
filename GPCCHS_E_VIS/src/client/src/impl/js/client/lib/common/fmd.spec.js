/* eslint-disable no-unused-expressions */
import { get } from 'common/parameters';
import globalConstants from 'common/constants';
import {
  createFmdApi, getRootDir, isInFmd, getRelativeFmdPath,
} from './fmd';
import { expect, sinon, nextTick } from './test';

describe('common/fmd', () => {
  const getIpcApi = (err = null, typeError = false) => ({
    server: {
      requestFmdCreate: sinon.spy((folder, fileName, mimeType, cb) => cb({
        err,
        serializedOid: 4242,
      })),
      requestFmdGet: sinon.spy((oId, cb) => cb({
        err,
        type: typeError ? 'unknownType' : globalConstants.FMDFILETYPE_DOCUMENT,
        detail: {
          dirname: { value: 'a/b/c' },
          basename: { value: 'document.json' },
          properties: true,
        },
      })),
    },
  });
  const ipcApi = getIpcApi();
  const errIpcApi = getIpcApi(new Error('test'));
  const badTypeIpcApi = getIpcApi(null, true);
  let api;
  let errApi;
  let badTypeApi;
  beforeEach(() => {
    api = createFmdApi(ipcApi);
    errApi = createFmdApi(errIpcApi);
    badTypeApi = createFmdApi(badTypeIpcApi);
  });
  describe('getRootDir', () => {
    it('should return same thing than parameters.get', () => {
      getRootDir().should.eql(get('FMD_ROOT_DIR'));
    });
  });

  describe('isInFmd', () => {
    // isInFmd do not check fs for existing path,
    // it's just function that check if path start with fmd root dir.
    it('should be true', () => {
      isInFmd(`${getRootDir()}/missing`).should.be.eql(true);
      isInFmd(getRootDir()).should.be.eql(true);
    });
    it('should be false', () => {
      isInFmd('/').should.be.eql(false);
    });
  });

  describe('getRelativeFmdPath', () => {
    it('should return relative fmd path (starting with \'/\')', () => {
      getRelativeFmdPath(getRootDir()).should.be.eql('/');
      getRelativeFmdPath(`${getRootDir()}/..`).should.be.eql('/..');
      getRelativeFmdPath(`${getRootDir()}/yolo`).should.be.eql('/yolo');
      getRelativeFmdPath(`${getRootDir()}/../fixtures/yolo`).should.be.eql('/yolo');
    });
  });

  describe('createDocument', () => {
    const fileName = 'newDocument.json';
    const path = `${getRootDir()}/${fileName}`;
    it('should be defined', () => {
      api.createDocument.should.exist;
      api.createDocument.should.be.a('function');
    });
    it('give serializedOid by callback', (done) => {
      api.createDocument(path, 'WorkSpace', nextTick((err, oid) => {
        oid.should.eql(4242);
        expect(err).to.not.be.an('error');
        const fn = ipcApi.server.requestFmdCreate;
        expect(fn.calledWith('/', fileName, 'WorkspaceDoc')).to.be.true;
        done();
      }));
    });
    it('give an error when documentType is unknown', (done) => {
      api.createDocument('./newFile.json', 'unknownDocumentType', nextTick((err, oid) => {
        expect(oid).to.be.undefined;
        err.should.be.an('error');
        done();
      }));
    });
    it('give an error when ipc fail', (done) => {
      errApi.createDocument(path, 'WorkSpace', nextTick((err, oid) => {
        expect(oid).to.be.undefined;
        err.should.be.an('error');
        done();
      }));
    });
    it('does nothing when path already exist', (done) => {
      api.createDocument('.', 'WorkSpace', nextTick((err, oid) => {
        expect(oid).to.be.undefined;
        expect(err).to.be.null;
        done();
      }));
    });
  });

  describe('resolveDocument', () => {
    it('resolveDocument should be defined', () => {
      api.resolveDocument.should.exist;
      api.resolveDocument.should.be.a('function');
    });
    it('give resolved filePath with properties', (done) => {
      api.resolveDocument('oid', (err, filePath, properties) => {
        expect(err).to.not.be.an('error');
        filePath.should.be.eql(`${getRootDir()}/a/b/c/document.json`);
        properties.should.be.true;
        expect(ipcApi.server.requestFmdGet.calledWith('oid')).to.be.true;
        done();
      });
    });
    it('give an error when responded type is not a valid document', (done) => {
      badTypeApi.resolveDocument('oid', (err, filePath, properties) => {
        err.should.be.an('error');
        expect(filePath).to.be.undefined;
        expect(properties).to.be.undefined;
        expect(ipcApi.server.requestFmdGet.calledWith('oid')).to.be.true;
        done();
      });
    });
    it('give an error when ipc failed', (done) => {
      errApi.resolveDocument('oid', (err, filePath, properties) => {
        err.should.be.an('error');
        expect(filePath).to.be.undefined;
        expect(properties).to.be.undefined;
        expect(ipcApi.server.requestFmdGet.calledWith('oid')).to.be.true;
        done();
      });
    });
  });
});
