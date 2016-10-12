require('../../utils/test');
const { domainData } = require('./onDomainData');
const dataStub = require('../../stubs/data');
const { sendToTestWs, getMessage, resetMessage } = require('../../stubs/testWebSocket');
const registeredCallbacks = require('../../utils/registeredCallbacks');

describe('onDomainData', () => {
  beforeEach(() => {
    resetMessage();
  });

  it('not queried', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myDomain = dataStub.getDomain({ name: 'fr.cnes.sat1.batman' });
    const myDomainProto = dataStub.getDomainProtobuf(myDomain);
    // launch test
    domainData(sendToTestWs, myQueryIdProto, myDomainProto);
    getMessage().should.deep.equal({});
  });

  it('works', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myDomains = dataStub.getDomains();
    const myDomainsProto = dataStub.getDomainsProtobuf(myDomains);
    registeredCallbacks.set(myQueryId, () => {});
    // launch test
    domainData(sendToTestWs, myQueryIdProto, myDomainsProto);
    // check data
    const domains = getMessage();
    domains.should.be.an('object');
    domains.should.have.an.property('event')
      .that.equal('domainResponse');
    domains.should.have.an.property('payload')
      .that.is.an('array')
      .that.have.properties(myDomains.domains);
  });
});
