const onSessionsData = require('./onSessionsData');
const dataStub = require('common/protobuf/stubs');

describe('controllers/utils/onSessionData', () => {
  it('should returns sessions data', (done) => {
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
