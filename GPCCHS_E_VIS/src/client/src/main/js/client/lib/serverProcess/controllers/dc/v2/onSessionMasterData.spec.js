// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

const { mockRegister, mockLoadStubs } = require('../../../../common/jest');
const { set } = require('../../../../common/callbacks');

mockRegister();
mockLoadStubs();

const protobuf = require('../../../../utils/adapters');
const onSessionMasterData = require('./onSessionMasterData');

describe('controllers/client/onSessionMasterData', () => {
  test('should returns master session data', () => {
    const myQueryId = 'myQueryId';
    const myUinteger = 42;
    const myUintegerProto = protobuf.encode(protobuf.getType('UINTEGER'), myUinteger);

    let value;
    set(myQueryId, (error, ret) => {
      value = ret;
      expect(value).toBe(myUinteger);
    });

    onSessionMasterData([{}, myUintegerProto], myQueryId);
  });
});
