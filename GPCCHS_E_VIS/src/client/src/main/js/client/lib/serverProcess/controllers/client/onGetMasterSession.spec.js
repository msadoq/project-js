const _concat = require('lodash/concat');
const { decode } = require('../../../utils/adapters');
const globalConstants = require('common/constants');

require('../../utils/test');


const onGetMasterSession = require('./onGetMasterSession');


let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

describe('controllers/client/onGetMasterSession', () => {
  beforeEach(() => {
    calls.length = 0;
  });
  it('works', () => {
    const myQueryId = 'myQueryId';
    // launch test
    onGetMasterSession(zmqEmulator, myQueryId);
    // check data
    calls.should.be.an('array')
      .that.has.lengthOf(2);
    calls[0].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.Header', calls[0]).messageType.should.equal(globalConstants.MESSAGETYPE_SESSION_MASTER_QUERY);
    calls[1].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.String', calls[1]).string.should.equal(myQueryId);
  });
});
