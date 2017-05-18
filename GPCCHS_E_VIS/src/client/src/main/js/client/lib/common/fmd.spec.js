/* eslint-disable no-unused-expressions */
import { get } from 'common/parameters';
import globalConstants from 'common/constants';
import * as fmdApi from './fmd';
import ipcApi from '../mainProcess/ipc';
import { expect, sinon } from './test';

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
  before(() => {
    stubs = [
      sinon.stub(ipcApi.server, 'requestFmdCreate').callsFake(mockedRequestFmdCreate),
      sinon.stub(ipcApi.server, 'requestFmdGet').callsFake(mockedRequestFmdGet),
    ];
  });
  after(() => {
    stubs.forEach(stub => stub.restore());
  });
  describe('getRootDir', () => {
    it('should return same thing than parameters.get', () => {
      fmdApi.getRootDir().should.eql(get('ISIS_DOCUMENTS_ROOT'));
    });
  });

  describe('isInFmd', () => {
    // isInFmd do not check fs for existing path,
    // it's just function that check if path start with fmd root dir.
    it('should be true', () => {
      fmdApi.isInFmd(`${fmdApi.getRootDir()}/missing`).should.be.eql(true);
      fmdApi.isInFmd(fmdApi.getRootDir()).should.be.eql(true);
    });
    it('should be false', () => {
      fmdApi.isInFmd('/').should.be.eql(false);
    });
  });

  describe('getRelativeFmdPath', () => {
    it('should return relative fmd path (starting with \'/\')', () => {
      fmdApi.getRelativeFmdPath(fmdApi.getRootDir()).should.be.eql('/');
      fmdApi.getRelativeFmdPath(`${fmdApi.getRootDir()}/..`).should.be.eql('/..');
      fmdApi.getRelativeFmdPath(`${fmdApi.getRootDir()}/yolo`).should.be.eql('/yolo');
      fmdApi.getRelativeFmdPath(`${fmdApi.getRootDir()}/../fixtures/yolo`).should.be.eql('/yolo');
    });
  });

  describe('createDocument', () => {
    const fileName = 'newDocument.json';
    const validPath = `${fmdApi.getRootDir()}/${fileName}`;
    it('should be defined', () => {
      fmdApi.createDocument.should.exist;
      fmdApi.createDocument.should.be.a('function');
    });
    it('give serializedOid by callback', (done) => {
      fmdApi.createDocument(validPath, 'WorkSpace', (err, oid) => {
        oid.should.eql(4242);
        expect(err).to.not.be.an('error');
        const fn = ipcApi.server.requestFmdCreate;
        expect(fn.calledWith('/', fileName, 'WorkspaceDoc')).to.be.true;
        done();
      });
    });
    it('give an error when documentType is unknown', (done) => {
      fmdApi.createDocument(validPath, 'unknownDocumentType', (err, oid) => {
        expect(oid).to.be.undefined;
        err.should.be.an('error');
        done();
      });
    });
    it('does nothing when path already exist', (done) => {
      fmdApi.createDocument('.', 'WorkSpace', (err, oid) => {
        expect(oid).to.be.undefined;
        expect(err).to.not.be.an('error');
        done();
      });
    });
    it('give an error when ipc fail', (done) => {
      fmdApi.createDocument('./filename:error', 'WorkSpace', (err, oid) => {
        expect(oid).to.be.undefined;
        err.should.be.an('error');
        done();
      });
    });
  });

  describe('resolveDocument', () => {
    it('resolveDocument should be defined', () => {
      fmdApi.resolveDocument.should.exist;
      fmdApi.resolveDocument.should.be.a('function');
    });
    it('give resolved filePath with properties', (done) => {
      fmdApi.resolveDocument('oid', (err, filePath, properties) => {
        expect(err).to.not.be.an('error');
        filePath.should.be.eql(`${fmdApi.getRootDir()}/a/b/c/document.json`);
        properties.should.be.true;
        expect(ipcApi.server.requestFmdGet.calledWith('oid')).to.be.true;
        done();
      });
    });
    it('give an error when responded type is not a valid document', (done) => {
      fmdApi.resolveDocument('oid:typeError', (err, filePath, properties) => {
        err.should.be.an('error');
        expect(filePath).to.be.undefined;
        expect(properties).to.be.undefined;
        expect(ipcApi.server.requestFmdGet.calledWith('oid')).to.be.true;
        done();
      });
    });
    it('give an error when ipc failed', (done) => {
      fmdApi.resolveDocument('oid:error', (err, filePath, properties) => {
        err.should.be.an('error');
        expect(filePath).to.be.undefined;
        expect(properties).to.be.undefined;
        expect(ipcApi.server.requestFmdGet.calledWith('oid')).to.be.true;
        done();
      });
    });
  });
});
