const _concat = require('lodash/concat');

const globalConstants = require('common/constants');
const { decode } = require('../../../utils/adapters');
const registeredCallbacks = require('../../../utils/callbacks');

require('../../utils/test');


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
  it('with queryId', () => {
    const myQueryId = 'totolasticot';
    // launch test
    onSessionsQuery(zmqEmulator, myQueryId);
    // check data
    calls.should.be.an('array')
      .that.has.lengthOf(2);
    calls[0].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.Header', calls[0]).messageType.should.equal(globalConstants.MESSAGETYPE_SESSION_QUERY);
    calls[1].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.String', calls[1]).string.should.equal(myQueryId);
  });
});
