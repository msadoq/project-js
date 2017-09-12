const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const { getStubData, loadStubs } = require('../../../utils/stubs');
const onFmdCreateData = require('./onFmdCreateData');
const { set } = require('../../../common/callbacks');

loadStubs();
const dataStub = getStubData();

describe('controllers/client/onFmdCreateData', () => {
  test('should returns file info if success', () => {
    const myQueryId1 = 'myQueryId1';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId1);
    const mySuccessProto = dataStub.getSuccessStatusProtobuf();
    const myFileInfo = dataStub.getFMDFileInfo();
    const myFileInfoProto = dataStub.getFMDFileInfoProtobuf(myFileInfo);
    set(myQueryId1, (expected) => {
      expect(expected).toMatchObject({});
    });
    onFmdCreateData([myQueryIdProto, mySuccessProto, myFileInfoProto]);
  });
  test('should returns an error if fail', () => {
    const myQueryId2 = 'myQueryId2';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId2);
    const myErrorProto = dataStub.getErrorStatusProtobuf();
    const myReason = 'myReason';
    const myReasonProto = dataStub.getStringProtobuf(myReason);
    set(myQueryId2, (expected) => {
      expect(expected).toMatchObject({});
    });
    onFmdCreateData([myQueryIdProto, myErrorProto, myReasonProto]);
  });
});
