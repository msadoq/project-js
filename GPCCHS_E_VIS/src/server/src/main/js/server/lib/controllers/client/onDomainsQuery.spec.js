const _concat = require('lodash/concat');
const { decode } = require('common/protobuf');
const globalConstants = require('common/constants');
const registeredCallbacks = require('common/callbacks');

require('../../utils/test');


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
  it('with queryId', () => {
    const myQueryId = 'totolasticot';
    // launch test
    onDomainsQuery(zmqEmulator, myQueryId);
    // check data
    calls.should.be.an('array')
      .that.has.lengthOf(2);
    calls[0].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.Header', calls[0]).messageType.should.equal(globalConstants.MESSAGETYPE_DOMAIN_QUERY);
    calls[1].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.String', calls[1]).string.should.equal(myQueryId);
  });
});
