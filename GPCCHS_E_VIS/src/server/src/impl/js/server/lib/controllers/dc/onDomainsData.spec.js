const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');
const onDomainsData = require('./onDomainsData');
const dataStub = require('common/stubs/data');
const registeredCallbacks = require('common/callbacks');

describe('controllers/dc/onDomainsData', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
  });

  it('works', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myDomains = dataStub.getDomains();
    const myDomainsProto = dataStub.getDomainsProtobuf(myDomains);
    registeredCallbacks.set(myQueryId, () => {});
    // launch test
    onDomainsData(testHandler, myQueryIdProto, myDomainsProto);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.be.an('object').that.has.properties({
      domains: myDomains.domains,
    });
  });
});
