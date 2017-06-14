const dataStub = require('common/protobuf/stubs');
const globalConstants = require('../../../constants');
const onFmdGetData = require('./onFmdGetData');

describe('controllers/client/onFmdGetData', () => {
  it('should supports collection request', (done) => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySuccessProto = dataStub.getSuccessStatusProtobuf();
    const myFileInfo = dataStub.getFMDFileInfo({ type: globalConstants.FMDFILETYPE_COLLECTION });
    const myFileInfoProto = dataStub.getFMDFileInfoProtobuf(myFileInfo);
    const myCollection = dataStub.getCollection();
    const myCollectionProto = dataStub.getCollectionProtobuf(myCollection);
    const myCollectionDeProto = dataStub.getCollectionDeProtobuf(myCollectionProto);

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        {
          type: myFileInfo.type,
          oId: myFileInfo.serializedOid,
          detail: myCollectionDeProto,
        },
      ]);
      done();
    };

    onFmdGetData(check, myQueryIdProto, mySuccessProto, myFileInfoProto, myCollectionProto);
  });
  it('should supports collection document request', (done) => {
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

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        {
          type: myFileInfo.type,
          oId: myFileInfo.serializedOid,
          detail: myCollectionDocumentDeProto,
        },
      ]);
      done();
    };

    onFmdGetData(
      check,
      myQueryIdProto,
      mySuccessProto,
      myFileInfoProto,
      myCollectionDocumentProto
    );
  });
  it('should supports document request', (done) => {
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

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        {
          type: myFileInfo.type,
          oId: myFileInfo.serializedOid,
          detail: myDocumentDeProto,
        },
      ]);
      done();
    };

    onFmdGetData(
      check,
      myQueryIdProto,
      mySuccessProto,
      myFileInfoProto,
      myDocumentProto
    );
  });
  it('should supports folder request', (done) => {
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

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        {
          type: myFileInfo.type,
          oId: myFileInfo.serializedOid,
          detail: myFolderDeProto,
        },
      ]);
      done();
    };

    onFmdGetData(
      check,
      myQueryIdProto,
      mySuccessProto,
      myFileInfoProto,
      myFolderProto
    );
  });
  it('should returns error if request failed', (done) => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myErrorProto = dataStub.getErrorStatusProtobuf();
    const myReason = 'myReason';
    const myReasonProto = dataStub.getStringProtobuf(myReason);

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        { err: myReason },
      ]);
      done();
    };

    onFmdGetData(check, myQueryIdProto, myErrorProto, myReasonProto);
  });
});
