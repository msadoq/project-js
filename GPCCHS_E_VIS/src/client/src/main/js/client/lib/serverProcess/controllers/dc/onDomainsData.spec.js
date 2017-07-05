const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const onDomainsData = require('./onDomainsData');
const { getStubData, loadStubs } = require('../../../utils/stubs');
const registeredCallbacks = require('../../../common/callbacks');

loadStubs();
const dataStub = getStubData();

describe('controllers/utils/onDomainsData', () => {
  test('should returns domains data', (done) => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myDomains = dataStub.getDomains();
    const myDomainsProto = dataStub.getDomainsProtobuf(myDomains);
    registeredCallbacks.set(myQueryId, () => {});

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        { domains: myDomains.domains },
      ]);
      done();
    };
    onDomainsData(check, myQueryIdProto, myDomainsProto);
  });
});