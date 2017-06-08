const dataStub = require('common/protobuf/stubs');

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
    expect(message).toHaveLength(2);
    expect(message[0]).toBe(myQueryId);
    expect(message[1]).toMatchObject({
      timestamp: myTimestamp,
    });
  });
});
