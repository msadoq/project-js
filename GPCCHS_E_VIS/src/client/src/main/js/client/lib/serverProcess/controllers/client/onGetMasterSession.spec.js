const _concat = require('lodash/concat');
const { decode } = require('common/protobuf');
const globalConstants = require('../../../constants');

const onGetMasterSession = require('./onGetMasterSession');


let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

describe('controllers/client/onGetMasterSession', () => {
  beforeEach(() => {
    calls.length = 0;
  });
  test('works', () => {
    const myQueryId = 'myQueryId';
    // launch test
    onGetMasterSession(zmqEmulator, myQueryId);
    // check data
    expect(calls).toHaveLength(2);
    expect(calls[0].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.Header', calls[0]).messageType).toBe(globalConstants.MESSAGETYPE_SESSION_MASTER_QUERY);
    expect(calls[1].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.String', calls[1]).string).toBe(myQueryId);
  });
});
