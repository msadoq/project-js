require('../../utils/test');
// eslint-disable-next-line import/no-extraneous-dependencies
const { decode } = require('common/protobuf');
const { sessionQuery } = require('./onSessionQuery');
const registeredCallbacks = require('../../utils/registeredCallbacks');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
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

describe('controllers/client/onSessionQuery', () => {
  beforeEach(() => {
    calls.length = 0;
    registeredCallbacks.clear();
  });
  it('sessionQuery', () => {
    // launch test
    sessionQuery(zmqEmulator);
    // check data
    const cbs = _keys(registeredCallbacks.getAll());
    cbs.length.should.equal(1);
    const queryId = cbs[0];
    calls.should.be.an('array')
      .that.has.lengthOf(2);
    calls[0].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.Header', calls[0]).messageType.should.equal(globalConstants.MESSAGETYPE_SESSION_QUERY);
    calls[1].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.String', calls[1]).string.should.equal(queryId);
  });
});
