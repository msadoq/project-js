const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const onDomainsData = require('./onDomainsData');
const { getStubData, loadStubs } = require('../../../utils/stubs');
const { set } = require('../../../common/callbacks');

loadStubs();
const dataStub = getStubData();

describe('controllers/utils/onDomainsData', () => {
  test('should returns domains data', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myDomains = dataStub.getDomains();
    const myDomainsProto = dataStub.getDomainsProtobuf(myDomains);
    set(myQueryId, (expected) => {
      expect(expected).toMatchObject(myDomains.domains);
    });
    onDomainsData([myQueryIdProto, myDomainsProto]);
  });
});
