const _keys = require('lodash/keys');
const _concat = require('lodash/concat');
const { decode } = require('common/protobuf');
const globalConstants = require('common/constants');
const registeredCallbacks = require('common/callbacks');

require('../../utils/test');


const { domainQuery } = require('./onDomainQuery');


let calls = [];
const zmqEmulator = (key, payload) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  calls = _concat(calls, payload);
};

describe('controllers/client/onDomainQuery', () => {
  beforeEach(() => {
    calls.length = 0;
    registeredCallbacks.clear();
  });
  it('with queryId', () => {
    const myQueryId = 'totolasticot';
    // launch test
    domainQuery(myQueryId, zmqEmulator);
    // check data
    const cbs = _keys(registeredCallbacks.getAll());
    cbs.length.should.equal(1);
    const queryId = cbs[0];
    queryId.should.equal(myQueryId);
    calls.should.be.an('array')
      .that.has.lengthOf(2);
    calls[0].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.Header', calls[0]).messageType.should.equal(globalConstants.MESSAGETYPE_DOMAIN_QUERY);
    calls[1].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.String', calls[1]).string.should.equal(myQueryId);
  });
  it('without queryId', () => {
    // launch test
    domainQuery(undefined, zmqEmulator);
    // check data
    const cbs = _keys(registeredCallbacks.getAll());
    cbs.length.should.equal(1);
    const queryId = cbs[0];
    calls.should.be.an('array')
      .that.has.lengthOf(2);
    calls[0].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.Header', calls[0]).messageType.should.equal(globalConstants.MESSAGETYPE_DOMAIN_QUERY);
    calls[1].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.String', calls[1]).string.should.equal(queryId);
  });
});
