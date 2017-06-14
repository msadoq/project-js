const { registerProtobuf } = require('../../../common/test');

registerProtobuf();

const dataStub = require('common/protobuf/stubs');
const onSessionTimeData = require('./onSessionTimeData');

describe('controllers/client/onSessionTimeData', () => {
  test('should returns session time', (done) => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myTimestamp = 42;
    const myTimestampProto = dataStub.getTimestampProtobuf({ ms: myTimestamp });

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        { timestamp: myTimestamp },
      ]);
      done();
    };

    onSessionTimeData(check, myQueryIdProto, myTimestampProto);
  });
});
