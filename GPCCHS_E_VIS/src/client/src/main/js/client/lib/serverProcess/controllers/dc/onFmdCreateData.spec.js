// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in serverProcess
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : FA : #6670 : 14/06/2017 : Replace automatic registration in jest.js by a registerProtobuf function in common/test
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters : - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix - Lint pass ( 1 test is still KO)
// END-HISTORY
// ====================================================================

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
