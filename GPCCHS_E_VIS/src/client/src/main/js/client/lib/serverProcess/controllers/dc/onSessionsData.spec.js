const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const onSessionsData = require('./onSessionsData');
const { getStubData } = require('../../../utils/stubs');

const dataStub = getStubData();
describe('controllers/utils/onSessionData', () => {
  test('should returns sessions data', (done) => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySessions = dataStub.getSessions();
    const mySessionsProto = dataStub.getSessionsProtobuf(mySessions);

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        { sessions: mySessions.sessions },
      ]);
      done();
    };

    onSessionsData(check, myQueryIdProto, mySessionsProto);
  });
});
