// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

const { mockRegister, mockLoadStubs } = require('../../../../common/jest');

mockRegister();
mockLoadStubs();

const { getStubData, loadStubs } = require('../../../../utils/stubs');
const onFmdCreateData = require('./onFmdCreateData');
const { set } = require('../../../../common/callbacks');

loadStubs();
const dataStub = getStubData();

describe('controllers/client/onFmdCreateData', () => {
  test('should returns file info if success', () => {
    const myQueryId1 = 'myQueryId1';
    const myFileInfo = dataStub.getFMDFileInfo();
    const myFileInfoProto = dataStub.getFMDFileInfoProtobuf(myFileInfo);
    set(myQueryId1, (expected) => {
      expect(expected).toMatchObject({});
    });
    onFmdCreateData([{}, myFileInfoProto], myQueryId1);
  });
});
