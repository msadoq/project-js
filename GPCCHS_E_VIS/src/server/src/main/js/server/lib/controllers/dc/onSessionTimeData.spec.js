const dataStub = require('common/stubs/data');

const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');


const onSessionTimeData = require('./onSessionTimeData');


describe('controllers/client/onSessionTimeData', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
  });
  it('works', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myTimestamp = 42;
    const myTimestampProto = dataStub.getTimestampProtobuf({ ms: myTimestamp });
    // launch test
    onSessionTimeData(testHandler, myQueryIdProto, myTimestampProto);
    // check data
    const message = getTestHandlerArgs();
    message.should.be.an('array')
      .that.has.lengthOf(2);
    message[0].should.equal(myQueryId);
    message[1].should.be.an('object')
      .that.have.properties({
        timestamp: myTimestamp,
      });
  });
});
