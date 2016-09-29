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
      callDcServerMessageControllers(
        wrongMessage,
        testHandler,
        testHandler,
        testHandler,
        testHandler
      );
    } catch (e) {
      e.should.be.an('error');
    }
  });
  it('DC Response', () => {
    const dcResponse = dataStub.getDcResponse();
    const dcResponseProto = dataStub.getDcResponseProtobuf(dcResponse);
    const dcResponseMessage = dataStub.getWrappedDcResponseProtobuf(dcResponse);
    callDcServerMessageControllers(
      dcResponseMessage,
      testHandler,
      testHandler,
      testHandler,
      testHandler
    );
    testPayloads.should.be.an('array').and.have.lengthOf(1);
    _.isEqual(testPayloads[0], dcResponseProto).should.equal(true);
  });
  it('Archive Message', () => {
    const archive = dataStub.getNewDataMessage({ dataSource: 'ARCHIVE' });
    const archiveMessage = dataStub.getWrappedNewDataMessageProtobuf(archive);
    callDcServerMessageControllers(
      archiveMessage,
      undefined,
      undefined,
      testHandler,
      undefined
    );
    testPayloads.should.be.an('array').and.have.lengthOf(4);
    testPayloads[0].should.deep.equal(archive.dataId);
    testPayloads[1].should.deep.equal(archive.id);
    testPayloads[2].should.deep.equal(archive.payloads);
    testPayloads[3].should.deep.equal(archive.isEndOfQuery);
  });
  it('RealTime Message', () => {
    const realtime = dataStub.getNewDataMessage({ dataSource: 'REAL_TIME' });
    const realtimeMessage = dataStub.getWrappedNewDataMessageProtobuf(realtime);
    callDcServerMessageControllers(
      realtimeMessage,
      undefined,
      undefined,
      undefined,
      testHandler
    );
    testPayloads.should.be.an('array').and.have.lengthOf(2);
    testPayloads[0].should.deep.equal(realtime.dataId);
    testPayloads[1].should.deep.equal(realtime.payloads);
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
