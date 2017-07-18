
const { decode } = require('../../../utils/adapters');
const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const _concat = require('lodash/concat');

const globalConstants = require('../../../constants');
const registeredCallbacks = require('../../../common/callbacks');

const onSessionsQuery = require('./onSessionsQuery');

let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

describe('controllers/client/onSessionQuery', () => {
  beforeEach(() => {
    calls.length = 0;
    registeredCallbacks.clear();
  });
  test('with queryId', () => {
    const myQueryId = 'totolasticot';
    // launch test
    onSessionsQuery(zmqEmulator, myQueryId);
    // check data
    expect(calls).toHaveLength(2);
    expect(calls[0].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.Header', calls[0]).messageType).toBe(globalConstants.MESSAGETYPE_SESSION_QUERY);
    expect(calls[1].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.String', calls[1]).string).toBe(myQueryId);
  });
});
