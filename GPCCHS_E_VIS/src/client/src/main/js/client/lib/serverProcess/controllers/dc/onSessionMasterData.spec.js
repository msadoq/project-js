const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const { getStubData } = require('../../../utils/stubs');
const protobuf = require('../../../utils/adapters');
const onSessionMasterData = require('./onSessionMasterData');

const dataStub = getStubData();

describe('controllers/client/onSessionMasterData', () => {
  test('should returns master session data', (done) => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myUinteger = 42;
    const myUintegerProto = protobuf.encode(protobuf.getType('UINTEGER'), myUinteger);

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        { masterSessionId: myUinteger },
      ]);
      done();
    };

    onSessionMasterData(check, myQueryIdProto, myUintegerProto);
  });
});
