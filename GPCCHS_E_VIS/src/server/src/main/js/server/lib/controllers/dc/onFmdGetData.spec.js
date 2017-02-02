const dataStub = require('common/stubs/data');
const globalConstants = require('common/constants');

const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');


const onFmdGetData = require('./onFmdGetData');


describe('controllers/client/onFmdGetData', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
  });
  it('collection', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySuccessProto = dataStub.getSuccessStatusProtobuf();
    const myFileInfo = dataStub.getFMDFileInfo({ type: globalConstants.FMDFILETYPE_COLLECTION });
    const myFileInfoProto = dataStub.getFMDFileInfoProtobuf(myFileInfo);
    const myCollection = dataStub.getCollection();
    const myCollectionProto = dataStub.getCollectionProtobuf(myCollection);
    const myCollectionDeProto = dataStub.getCollectionDeProtobuf(myCollectionProto);
    // launch test
    onFmdGetData(testHandler, myQueryIdProto, mySuccessProto, myFileInfoProto, myCollectionProto);
    // check data
    const message = getTestHandlerArgs();
    message.should.be.an('array')
      .that.has.lengthOf(2);
    message[0].should.equal(myQueryId);
    message[1].should.be.an('object')
      .that.have.properties({
        type: myFileInfo.type,
        oId: myFileInfo.serializedOid,
        detail: myCollectionDeProto,
      });
  });
  it('collection document', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySuccessProto = dataStub.getSuccessStatusProtobuf();
    const myFileInfo = dataStub.getFMDFileInfo({
      type: globalConstants.FMDFILETYPE_COLLECTION_DOCUMENT,
    });
    const myFileInfoProto = dataStub.getFMDFileInfoProtobuf(myFileInfo);
    const myCollectionDocument = dataStub.getCollectionDocument();
    const myCollectionDocumentProto = dataStub.getCollectionDocumentProtobuf(myCollectionDocument);
    const myCollectionDocumentDeProto =
      dataStub.getCollectionDocumentDeProtobuf(myCollectionDocumentProto);
    // launch test
    onFmdGetData(
      testHandler,
      myQueryIdProto,
      mySuccessProto,
      myFileInfoProto,
      myCollectionDocumentProto
    );
    // check data
    const message = getTestHandlerArgs();
    message.should.be.an('array')
      .that.has.lengthOf(2);
    message[0].should.equal(myQueryId);
    message[1].should.be.an('object')
      .that.have.properties({
        type: myFileInfo.type,
        oId: myFileInfo.serializedOid,
        detail: myCollectionDocumentDeProto,
      });
  });
  it('document', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySuccessProto = dataStub.getSuccessStatusProtobuf();
    const myFileInfo = dataStub.getFMDFileInfo({
      type: globalConstants.FMDFILETYPE_DOCUMENT,
    });
    const myFileInfoProto = dataStub.getFMDFileInfoProtobuf(myFileInfo);
    const myDocument = dataStub.getDocument();
    const myDocumentProto = dataStub.getDocumentProtobuf(myDocument);
    const myDocumentDeProto =
      dataStub.getDocumentDeProtobuf(myDocumentProto);
    // launch test
    onFmdGetData(
      testHandler,
      myQueryIdProto,
      mySuccessProto,
      myFileInfoProto,
      myDocumentProto
    );
    // check data
    const message = getTestHandlerArgs();
    message.should.be.an('array')
      .that.has.lengthOf(2);
    message[0].should.equal(myQueryId);
    message[1].should.be.an('object')
      .that.have.properties({
        type: myFileInfo.type,
        oId: myFileInfo.serializedOid,
        detail: myDocumentDeProto,
      });
  });
  it('folder', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySuccessProto = dataStub.getSuccessStatusProtobuf();
    const myFileInfo = dataStub.getFMDFileInfo({
      type: globalConstants.FMDFILETYPE_FOLDER,
    });
    const myFileInfoProto = dataStub.getFMDFileInfoProtobuf(myFileInfo);
    const myFolder = dataStub.getFolder();
    const myFolderProto = dataStub.getFolderProtobuf(myFolder);
    const myFolderDeProto =
      dataStub.getFolderDeProtobuf(myFolderProto);
    // launch test
    onFmdGetData(
      testHandler,
      myQueryIdProto,
      mySuccessProto,
      myFileInfoProto,
      myFolderProto
    );
    // check data
    const message = getTestHandlerArgs();
    message.should.be.an('array')
      .that.has.lengthOf(2);
    message[0].should.equal(myQueryId);
    message[1].should.be.an('object')
      .that.have.properties({
        type: myFileInfo.type,
        oId: myFileInfo.serializedOid,
        detail: myFolderDeProto,
      });
  });
  it('error', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myErrorProto = dataStub.getErrorStatusProtobuf();
    const myReason = 'myReason';
    const myReasonProto = dataStub.getStringProtobuf(myReason);
    // launch test
    onFmdGetData(testHandler, myQueryIdProto, myErrorProto, myReasonProto);
    // check data
    const message = getTestHandlerArgs();
    message.should.be.an('array')
      .that.has.lengthOf(2);
    message[0].should.equal(myQueryId);
    message[1].should.be.an('object')
      .that.have.properties({
        err: myReason,
      });
  });
});
