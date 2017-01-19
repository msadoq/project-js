const dataStub = require('common/stubs/data');
const protobuf = require('common/protobuf');

const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');


const onSessionMasterData = require('./onSessionMasterData');


describe('controllers/client/onSessionMasterData', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
  });
  it('works', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myUinteger = 42;
    const myUintegerProto = protobuf.encode(protobuf.getType('UINTEGER'), { value: myUinteger });
    // launch test
    onSessionMasterData(testHandler, myQueryIdProto, myUintegerProto);
    // check data
    const message = getTestHandlerArgs();
    message.should.be.an('array')
      .that.has.lengthOf(2);
    message[0].should.equal(myQueryId);
    message[1].should.be.an('object')
      .that.have.properties({
        masterSessionId: myUinteger,
      });
  });
});
