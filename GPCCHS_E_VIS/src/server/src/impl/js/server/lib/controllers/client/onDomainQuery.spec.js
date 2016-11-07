require('../../utils/test');
const { decode } = require('../../protobuf');
const { domainQuery } = require('./onDomainQuery');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const constants = require('../../constants');
const {
  keys: _keys,
  concat: _concat,
} = require('lodash');

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
  it('domainQuery', () => {
    // launch test
    domainQuery(zmqEmulator);
    // check data
    const cbs = _keys(registeredCallbacks.getAll());
    cbs.length.should.equal(1);
    const queryId = cbs[0];
    calls.should.be.an('array')
      .that.has.lengthOf(2);
    calls[0].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.Header', calls[0]).messageType.should.equal(constants.MESSAGETYPE_DOMAIN_QUERY);
    calls[1].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.String', calls[1]).string.should.equal(queryId);
  });
});
