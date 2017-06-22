const { registerProtobuf } = require('../../../common/jest');

registerProtobuf();

const dataStub = require('common/protobuf/stubs');
const protobuf = require('../../../utils/adapters');
const onSessionMasterData = require('./onSessionMasterData');

describe('controllers/client/onSessionMasterData', () => {
  test('should returns master session data', (done) => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myUinteger = 42;
    const myUintegerProto = protobuf.encode(protobuf.getType('UINTEGER'), { value: myUinteger });

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
