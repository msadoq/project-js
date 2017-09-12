const { mockRegister, mockLoadStubs } = require('../../../common/jest');
const { set } = require('../../../common/callbacks');

mockRegister();
mockLoadStubs();

const { getStubData, loadStubs } = require('../../../utils/stubs');
const onSessionTimeData = require('./onSessionTimeData');

loadStubs();
const dataStub = getStubData();

describe('controllers/client/onSessionTimeData', () => {
  test('should returns session time', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myTimestamp = 42;
    const myTimestampProto = dataStub.getTimestampProtobuf({ ms: myTimestamp });

    set(myQueryId, (expected) => {
      expect(expected.timestamp).toBe(myTimestamp);
    });

    onSessionTimeData([myQueryIdProto, myTimestampProto]);
  });
});
