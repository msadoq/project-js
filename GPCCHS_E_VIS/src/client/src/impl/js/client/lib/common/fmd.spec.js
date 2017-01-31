/* eslint-disable no-unused-expressions */
import { get } from 'common/parameters';
import globalConstants from 'common/constants';
import {
  createFmdApi, getRootDir, isInFmd, getRelativeFmdPath,
} from './fmd';
import { expect, sinon, nextTick } from './test';

describe.only('common/fmd', () => {
  const getIpcApi = (err = null) => ({
    server: {
      requestFmdCreate: sinon.spy((folder, fileName, mimeType, cb) => cb({
        err,
        serializedOid: 4242,
      })),
      requestFmdGet: sinon.spy((oId, cb) => cb({
        err,
        type: globalConstants.FMDFILETYPE_DOCUMENT,
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
  let api;
  let errApi;
  beforeEach(() => {
    api = createFmdApi(ipcApi);
    errApi = createFmdApi(errIpcApi);
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
  });
});
