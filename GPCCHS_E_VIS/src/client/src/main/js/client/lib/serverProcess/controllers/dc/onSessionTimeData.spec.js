const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const { getStubData, loadStubs } = require('../../../utils/stubs');
const onSessionTimeData = require('./onSessionTimeData');

loadStubs();
const dataStub = getStubData();

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
