const _concat = require('lodash/concat');
const { decode } = require('common/protobuf');
const globalConstants = require('common/constants');
const dataStub = require('common/protobuf/stubs');

require('../../utils/test');


const onFmdGet = require('./onFmdGet');


let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

describe('controllers/client/onFmdGet', () => {
  beforeEach(() => {
    calls.length = 0;
  });
  it('works', () => {
    const myQueryId = 'myQueryId';
    const myGetDocumentAction = dataStub.getFMDGet();
    // launch test
    onFmdGet(zmqEmulator, myQueryId, { oid: myGetDocumentAction.serializedOid });
    // check data
    calls.should.be.an('array')
      .that.has.lengthOf(3);
    calls[0].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.Header', calls[0]).messageType.should.equal(globalConstants.MESSAGETYPE_FMD_GET_QUERY);
    calls[1].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.String', calls[1]).string.should.equal(myQueryId);
    calls[2].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.FMDGet', calls[2]).should.have.properties({
      serializedOid: myGetDocumentAction.serializedOid,
    });
  });
});
