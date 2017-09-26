// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Fix unit tests after common/* migration to client/
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in serverProcess
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 14/06/2017 : Replace automatic registration in jest.js by a registerProtobuf function in common/test
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters : - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix - Lint pass ( 1 test is still KO)
// END-HISTORY
// ====================================================================

const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const onDcStatus = require('./onDcStatus');
const { getStubData, loadStubs } = require('../../../utils/stubs');
const globalConstants = require('../../../constants');
const { get: getDcStatus, reset: resetDcStatus } = require('../../models/dcStatus');

loadStubs();
const dataStub = getStubData();

describe('controllers/utils/onDcStatus', () => {
  beforeEach(() => {
    resetDcStatus();
  });
  it.skip('healthy', () => {
    const healthy = dataStub.getHealthyDcStatusProtobuf();

    onDcStatus(healthy);
    expect(getDcStatus()).toEqual(globalConstants.HEALTH_STATUS_HEALTHY);
  });
  test('congestion', () => {
    const congestion = dataStub.getCongestionDcStatusProtobuf();

    onDcStatus([congestion]);

    expect(getDcStatus()).toEqual(globalConstants.HEALTH_STATUS_CRITICAL);
  });
});
