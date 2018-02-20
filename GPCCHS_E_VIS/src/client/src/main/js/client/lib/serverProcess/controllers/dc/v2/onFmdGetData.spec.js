// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in serverProcess
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : FA : #6670 : 14/06/2017 : Replace automatic registration in jest.js by a registerProtobuf function in common/test
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters : - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix - Lint pass ( 1 test is still KO)
// END-HISTORY
// ====================================================================

const { mockRegister, mockLoadStubs } = require('../../../../common/jest');

mockRegister();
mockLoadStubs();

const { getStubData, loadStubs } = require('../../../../utils/stubs');
const globalConstants = require('../../../../constants');
const onFmdGetData = require('./onFmdGetData');
const { set } = require('../../../../common/callbacks');

loadStubs();
const dataStub = getStubData();

describe('controllers/client/onFmdGetData', () => {
  test('should supports collection request', () => {
    const myQueryId = 'myQueryId1';
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

    onFmdGetData([{}, myFileInfoProto, myCollectionProto], myQueryId);
  });
  test('should supports collection document request', () => {
    const myQueryId = 'myQueryId2';
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
      {},
      myFileInfoProto,
      myCollectionDocumentProto,
    ], myQueryId);
  });
  test('should supports document request', () => {
    const myQueryId = 'myQueryId3';
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
      {},
      myFileInfoProto,
      myDocumentProto,
    ], myQueryId);
  });
  test('should supports folder request', () => {
    const myQueryId = 'myQueryId4';
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
      {},
      myFileInfoProto,
      myFolderProto,
    ], myQueryId);
  });
});
