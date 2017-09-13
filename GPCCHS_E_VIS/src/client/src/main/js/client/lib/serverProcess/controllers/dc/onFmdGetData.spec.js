const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const { getStubData, loadStubs } = require('../../../utils/stubs');
const globalConstants = require('../../../constants');
const onFmdGetData = require('./onFmdGetData');
const { set } = require('../../../common/callbacks');

loadStubs();
const dataStub = getStubData();

describe('controllers/client/onFmdGetData', () => {
  test('should supports collection request', () => {
    const myQueryId = 'myQueryId1';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySuccessProto = dataStub.getSuccessStatusProtobuf();
    const myFileInfo = dataStub.getFMDFileInfo({ type: globalConstants.FMDFILETYPE_COLLECTION });
    const myFileInfoProto = dataStub.getFMDFileInfoProtobuf(myFileInfo);
    const myCollection = dataStub.getCollection();
    const myCollectionProto = dataStub.getCollectionProtobuf(myCollection);
    const myCollectionDeProto = dataStub.getCollectionDeProtobuf(myCollectionProto);
    set(myQueryId, (expected) => {
      expect(expected).toMatchObject({
        type: myFileInfo.type,
        oId: myFileInfo.serializedOid,
        detail: myCollectionDeProto,
      });
    });

    onFmdGetData([myQueryIdProto, mySuccessProto, myFileInfoProto, myCollectionProto]);
  });
  test('should supports collection document request', () => {
    const myQueryId = 'myQueryId2';
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
    set(myQueryId, (expected) => {
      expect(expected).toMatchObject({
        type: myFileInfo.type,
        oId: myFileInfo.serializedOid,
        detail: myCollectionDocumentDeProto,
      });
    });

    onFmdGetData([
      myQueryIdProto,
      mySuccessProto,
      myFileInfoProto,
      myCollectionDocumentProto,
    ]);
  });
  test('should supports document request', () => {
    const myQueryId = 'myQueryId3';
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
    set(myQueryId, (expected) => {
      expect(expected).toMatchObject({
        type: myFileInfo.type,
        oId: myFileInfo.serializedOid,
        detail: myDocumentDeProto,
      });
    });

    onFmdGetData([
      myQueryIdProto,
      mySuccessProto,
      myFileInfoProto,
      myDocumentProto,
    ]);
  });
  test('should supports folder request', () => {
    const myQueryId = 'myQueryId4';
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
    set(myQueryId, (expected) => {
      expect(expected).toMatchObject({
        type: myFileInfo.type,
        oId: myFileInfo.serializedOid,
        detail: myFolderDeProto,
      });
    });

    onFmdGetData([
      myQueryIdProto,
      mySuccessProto,
      myFileInfoProto,
      myFolderProto,
    ]);
  });
  test('should returns error if request failed', () => {
    const myQueryId = 'myQueryId5';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myErrorProto = dataStub.getErrorStatusProtobuf();
    const myReason = 'myReason';
    const myReasonProto = dataStub.getStringProtobuf(myReason);
    set(myQueryId, (expected) => {
      expect(expected).toMatchObject({
        err: myReason,
      });
    });

    onFmdGetData([myQueryIdProto, myErrorProto, myReasonProto]);
  });
});
