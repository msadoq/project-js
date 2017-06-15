const _concat = require('lodash/concat');
const { decode } = require('../../../utils/adapters');
const globalConstants = require('common/constants');
const dataStub = require('common/protobuf/stubs');
require('../../utils/test');


const onGetSessionTime = require('./onGetSessionTime');


let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

describe('controllers/client/onGetSessionTime', () => {
  beforeEach(() => {
    calls.length = 0;
  });
  it('works', () => {
    const myQueryId = 'myQueryId';
    const mySessionGetTime = dataStub.getSessionGetTime();
    // launch test
    onGetSessionTime(zmqEmulator, myQueryId, { sessionId: mySessionGetTime.id });
    // check data
    calls.should.be.an('array')
      .that.has.lengthOf(3);
    calls[0].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.Header', calls[0]).messageType.should.equal(globalConstants.MESSAGETYPE_SESSION_TIME_QUERY);
    calls[1].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.String', calls[1]).string.should.equal(myQueryId);
    calls[2].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.SessionGetTime', calls[2]).should.have.properties(mySessionGetTime);
  });
});
