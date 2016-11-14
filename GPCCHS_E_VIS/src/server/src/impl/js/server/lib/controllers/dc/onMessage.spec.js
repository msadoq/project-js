const { testPayloads, testHandler } = require('../../utils/test');
const { message } = require('./onMessage');
// eslint-disable-next-line import/no-extraneous-dependencies
const dataStub = require('common/stubs/data');

describe('controllers/dc/onMessage', () => {
  beforeEach(() => {
    testPayloads.length = 0;
  });
  it('Response', () => {
    const header = dataStub.getResponseHeaderProtobuf();
    const queryId = dataStub.getStringProtobuf();
    const status = dataStub.getSuccessStatusProtobuf();
    message(
      testHandler,
      undefined,
      undefined,
      undefined,
      undefined,
      header,
      queryId,
      status
    );
    testPayloads.should.have.lengthOf(3);
    testPayloads.should.have.properties([
      queryId,
      status,
    ]);
  });
  it('Archive Data', () => {
    const header = dataStub.getTimebasedArchiveDataHeaderProtobuf();
    const queryId = dataStub.getStringProtobuf();
    const dataId = dataStub.getDataIdProtobuf();
    const isLast = dataStub.getBooleanProtobuf();
    const timestamp = dataStub.getTimestampProtobuf();
    const payload = dataStub.getReportingParameterProtobuf();
    message(
      undefined,
      undefined,
      testHandler,
      undefined,
      undefined,
      header,
      queryId,
      dataId,
      isLast,
      timestamp,
      payload,
      timestamp,
      payload
    );
    testPayloads.should.have.lengthOf(7);
    testPayloads.should.have.properties([
      queryId,
      dataId,
      isLast,
      timestamp,
      payload,
      timestamp,
      payload,
    ]);
  });
  it('PubSub Data', () => {
    const header = dataStub.getTimebasedPubSubDataHeaderProtobuf();
    const dataId = dataStub.getDataIdProtobuf();
    const timestamp = dataStub.getTimestampProtobuf();
    const payload = dataStub.getReportingParameterProtobuf();
    message(
      undefined,
      undefined,
      undefined,
      testHandler,
      undefined,
      header,
      dataId,
      timestamp,
      payload,
      timestamp,
      payload
    );
    testPayloads.should.have.lengthOf(5);
    testPayloads.should.have.properties([
      dataId,
      timestamp,
      payload,
      timestamp,
      payload,
    ]);
  });
  it('Domain Data', () => {
    const header = dataStub.getDomainDataHeaderProtobuf();
    const queryId = dataStub.getDataIdProtobuf();
    const domains = dataStub.getDomainsProtobuf();
    message(
      undefined,
      testHandler,
      undefined,
      undefined,
      undefined,
      header,
      queryId,
      domains
    );
    testPayloads.should.have.lengthOf(2);
    testPayloads.should.have.properties([
      queryId,
      domains,
    ]);
  });
  it('Session Data', () => {
    const header = dataStub.getSessionDataHeaderProtobuf();
    const queryId = dataStub.getDataIdProtobuf();
    const sessions = dataStub.getSessionsProtobuf();
    message(
      undefined,
      undefined,
      undefined,
      undefined,
      testHandler,
      header,
      queryId,
      sessions
    );
    testPayloads.should.have.lengthOf(2);
    testPayloads.should.have.properties([
      queryId,
      sessions,
    ]);
  });
});
