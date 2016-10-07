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
    (() => domainData(sendToTestWs, myQueryIdProto, myDomainProto)).should.throw();
  });

  it('works', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myDomain = dataStub.getDomain({ name: 'fr.cnes.sat1.batman' });
    const myDomain2 = dataStub.getDomain({ name: 'fr.cnes.sat1.robin' });
    const myDomainProto = dataStub.getDomainProtobuf(myDomain);
    const myDomainProto2 = dataStub.getDomainProtobuf(myDomain2);
    registeredCallbacks.set(myQueryId, () => {});
    // launch test
    domainData(sendToTestWs, myQueryIdProto, myDomainProto, myDomainProto2);
    // check data
    const domains = getMessage();
    domains.should.be.an('object');
    domains.should.have.an.property('event')
      .that.equal('domainResponse');
    domains.should.have.an.property('payload')
      .that.is.an('array')
      .that.have.lengthOf(2);
    domains.payload.should.have.properties([
      myDomain,
      myDomain2,
    ]);
  });
});
