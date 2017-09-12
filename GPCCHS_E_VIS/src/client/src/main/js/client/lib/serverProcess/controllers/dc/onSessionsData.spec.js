const { mockRegister, mockLoadStubs } = require('../../../common/jest');
const { set } = require('../../../common/callbacks');

mockRegister();
mockLoadStubs();

const onSessionsData = require('./onSessionsData');
const { getStubData } = require('../../../utils/stubs');

const dataStub = getStubData();
describe('controllers/utils/onSessionData', () => {
  test('should returns sessions data', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySessions = dataStub.getSessions();
    const mySessionsProto = dataStub.getSessionsProtobuf(mySessions);

    set(myQueryId, (session) => {
      expect(session).toMatchObject(mySessions.sessions);
    });

    onSessionsData([myQueryIdProto, mySessionsProto]);
  });
});
