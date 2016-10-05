// const debug = require('../io/debug')('controllers:onMessage.spec');
const _ = require('lodash');
const { testPayloads, testHandler } = require('../../utils/test');
const { callDcServerMessageControllers } = require('./onMessage');
const dataStub = require('../../stubs/data');

describe('onMessage', () => {
  beforeEach(() => {
    testPayloads.length = 0;
  });
  it('unknown messageType', () => {
    const protobuf = require('../../protobuf/index');

    const wrongMessage = protobuf.encode(
      'dc.dataControllerUtils.DcServerMessage',
      {
        messageType: 0, // 'UNKNOWN'
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
    const archive = dataStub.getNewDataMessage({ dataSource: 2 }); // 'ARCHIVE'
    const archiveMessage = dataStub.getWrappedNewDataMessageProtobuf(archive);
    callDcServerMessageControllers(
      archiveMessage,
      undefined,
      undefined,
      testHandler,
      undefined
    );
    testPayloads.should.be.an('array').and.have.lengthOf(4);
    testPayloads[0].should.have.properties(archive.dataId);
    testPayloads[1].should.equal(archive.id);
    testPayloads[2].should.have.properties(archive.payloads);
    testPayloads[3].should.have.properties(archive.isEndOfQuery);
  });
  it('RealTime Message', () => {
    const realtime = dataStub.getNewDataMessage({ dataSource: 1 }); // 'REAL_TIME'
    const realtimeMessage = dataStub.getWrappedNewDataMessageProtobuf(realtime);
    callDcServerMessageControllers(
      realtimeMessage,
      undefined,
      undefined,
      undefined,
      testHandler
    );
    testPayloads.should.be.an('array').and.have.lengthOf(2);
    testPayloads[0].should.have.properties(realtime.dataId);
    testPayloads[1].should.have.properties(realtime.payloads);
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
