const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');
const { domainData } = require('./onDomainsData');
const dataStub = require('common/stubs/data');
const globalConstants = require('common/constants');
const registeredCallbacks = require('common/callbacks');

describe('controllers/dc/onDomainData', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
  });

  it('not queried', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myDomains = dataStub.getDomains();
    const myDomainsProto = dataStub.getDomainsProtobuf(myDomains);
    // launch test
    domainData(testHandler, myQueryIdProto, myDomainsProto);
    getTestHandlerArgs().should.have.lengthOf(0);
  });

  it('works', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myDomains = dataStub.getDomains();
    const myDomainsProto = dataStub.getDomainsProtobuf(myDomains);
    registeredCallbacks.set(myQueryId, () => {});
    // launch test
    domainData(testHandler, myQueryIdProto, myDomainsProto);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(3);
    wsArgs[0].should.equal(globalConstants.EVENT_DOMAIN_DATA);
    wsArgs[1].should.be.an('array')
      .that.have.properties(myDomains.domains);
    wsArgs[2].should.equal(myQueryId);
  });
});
