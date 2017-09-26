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
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters : - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix - Lint pass ( 1 test is still KO)
// VERSION : 1.1.2 : FA : #6798 : 23/06/2017 : Small fix : fix unit test in decode proto UINTEGER
// END-HISTORY
// ====================================================================

const { mockRegister, mockLoadStubs } = require('../../../common/jest');
const { set } = require('../../../common/callbacks');

mockRegister();
mockLoadStubs();

const { getStubData } = require('../../../utils/stubs');
const protobuf = require('../../../utils/adapters');
const onSessionMasterData = require('./onSessionMasterData');

const dataStub = getStubData();

describe('controllers/client/onSessionMasterData', () => {
  test('should returns master session data', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myUinteger = 42;
    const myUintegerProto = protobuf.encode(protobuf.getType('UINTEGER'), myUinteger);

    let value;
    set(myQueryId, (ret) => {
      value = ret;
      expect(value).toBe(myUinteger);
    });

    onSessionMasterData([myQueryIdProto, myUintegerProto]);
  });
});
