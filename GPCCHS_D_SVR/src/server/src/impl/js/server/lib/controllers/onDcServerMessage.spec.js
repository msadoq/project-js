// const debug = require('../io/debug')('controllers:onDcServerMessage.spec');
const _ = require('lodash');
const { testPayloads, testHandler } = require('../utils/test');
const { callDcServerMessageControllers } = require('./onDcServerMessage');
const dataStub = require('../stubs/data');

describe('onDcServerMessage', () => {
  beforeEach(() => {
    testPayloads.length = 0;
  });
  it('unknown messageType', () => {
    const protobuf = require('../protobuf/index');

    const wrongMessage = protobuf.encode(
      'dc.dataControllerUtils.DcServerMessage',
      {
        messageType: 'UNKNOWN',
        payload: dataStub.getNewDataMessageProtobuf(),
      }
    );
    try {
      callDcServerMessageControllers(wrongMessage, testHandler, testHandler, testHandler);
    } catch (e) {
      e.should.be.an('error');
    }
  });
  it('DC Response', () => {
    const dcResponse = dataStub.getDcResponse();
    const dcResponseProto = dataStub.getDcResponseProtobuf(dcResponse);
    const dcResponseMessage = dataStub.getWrappedDcResponseProtobuf(dcResponse);
    callDcServerMessageControllers(dcResponseMessage, testHandler, testHandler, testHandler);
    testPayloads.should.be.an('array').and.have.lengthOf(1);
    _.isEqual(testPayloads[0], dcResponseProto).should.equal(true);
  });
  it('New Data Message', () => {
    const newDataMessage = dataStub.getNewDataMessage();
    const newDataMessageProto = dataStub.getNewDataMessageProtobuf(newDataMessage);
    const newDataMessageMessage = dataStub.getWrappedNewDataMessageProtobuf(newDataMessage);
    callDcServerMessageControllers(newDataMessageMessage, testHandler, testHandler, testHandler);
    testPayloads.should.be.an('array').and.have.lengthOf(1);
    _.isEqual(testPayloads[0], newDataMessageProto).should.equal(true);
  });
  it('Domain Response', () => {
    const domainResponse = dataStub.getDomainResponse();
    const domainResponseProto = dataStub.getDomainResponseProtobuf(domainResponse);
    const domainResponseMessage = dataStub.getWrappedDomainResponseProtobuf(domainResponse);
    callDcServerMessageControllers(domainResponseMessage, testHandler, testHandler, testHandler);
    testPayloads.should.be.an('array').and.have.lengthOf(1);
    _.isEqual(testPayloads[0], domainResponseProto).should.equal(true);
  });
});
