// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in serverProcess
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters : - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix - Lint pass ( 1 test is still KO)
// END-HISTORY
// ====================================================================

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

    set(myQueryId, (error, session) => {
      expect(session).toMatchObject(mySessions.sessions);
    });

    onSessionsData([myQueryIdProto, mySessionsProto]);
  });
});
