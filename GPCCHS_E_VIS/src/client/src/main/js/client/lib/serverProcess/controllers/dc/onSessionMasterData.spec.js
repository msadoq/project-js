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
    set(myQueryId, (error, ret) => {
      value = ret;
      expect(value).toBe(myUinteger);
    });

    onSessionMasterData([myQueryIdProto, myUintegerProto]);
  });
});
