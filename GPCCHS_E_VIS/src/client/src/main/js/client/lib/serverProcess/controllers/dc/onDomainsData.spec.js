const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');
const onDomainsData = require('./onDomainsData');
const dataStub = require('common/protobuf/stubs');
const registeredCallbacks = require('../../../utils/callbacks');

describe('controllers/utils/onDomainsData', () => {
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
    expect(wsArgs).toHaveLength(2);
    expect(wsArgs[0]).toBe(myQueryId);
    expect(wsArgs[1]).toMatchObject({
      domains: myDomains.domains,
    });
  });
});
