const { registerProtobuf } = require('../../../common/jest');

registerProtobuf();

const _concat = require('lodash/concat');
const { decode } = require('common/protobuf');
const globalConstants = require('../../../constants');
const registeredCallbacks = require('../../../common/callbacks');

const onDomainsQuery = require('./onDomainsQuery');


let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

describe('controllers/client/onDomainsQuery', () => {
  beforeEach(() => {
    calls.length = 0;
    registeredCallbacks.clear();
  });
  test('with queryId', () => {
    const myQueryId = 'totolasticot';
    // launch test
    onDomainsQuery(zmqEmulator, myQueryId);
    // check data
    expect(calls).toHaveLength(2);
    expect(calls[0].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.Header', calls[0]).messageType).toBe(globalConstants.MESSAGETYPE_DOMAIN_QUERY);
    expect(calls[1].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.String', calls[1]).string).toBe(myQueryId);
  });
});
