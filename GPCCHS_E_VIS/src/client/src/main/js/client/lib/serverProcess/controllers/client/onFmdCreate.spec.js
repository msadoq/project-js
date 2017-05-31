const _concat = require('lodash/concat');
const { decode } = require('common/protobuf');
const globalConstants = require('common/constants');
const dataStub = require('common/protobuf/stubs');

require('../../utils/test');


const onFmdCreate = require('./onFmdCreate');


let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

describe('controllers/client/onFmdCreate', () => {
  beforeEach(() => {
    calls.length = 0;
  });
  it('works', () => {
    const myQueryId = 'myQueryId';
    const myCreateDocumentAction = dataStub.getFMDCreateDocument();
    // launch test
    onFmdCreate(zmqEmulator, myQueryId, myCreateDocumentAction);
    // check data
    calls.should.be.an('array')
      .that.has.lengthOf(3);
    calls[0].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.Header', calls[0]).messageType.should.equal(globalConstants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY);
    calls[1].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.String', calls[1]).string.should.equal(myQueryId);
    calls[2].constructor.should.equal(Buffer);
    decode('dc.dataControllerUtils.FMDCreateDocument', calls[2]).should.have.properties({
      name: myCreateDocumentAction.name,
      path: myCreateDocumentAction.path,
      mimeType: myCreateDocumentAction.mimeType,
    });
  });
});
