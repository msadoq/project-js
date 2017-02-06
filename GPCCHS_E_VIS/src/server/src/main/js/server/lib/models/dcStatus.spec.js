require('../utils/test');
const dcStatus = require('./dcStatus');
const globalConstants = require('common/constants');

describe('models/dcStatus', () => {
  beforeEach(() => {
    dcStatus.reset();
  });
  it('get', () => {
    dcStatus.get()
      .should.equal(globalConstants.HEALTH_STATUS_HEALTHY);
  });
  it('set', () => {
    dcStatus.set(globalConstants.HEALTH_STATUS_CRITICAL);
    dcStatus.get()
      .should.equal(globalConstants.HEALTH_STATUS_CRITICAL);
  });
  it('reset', () => {
    dcStatus.set(globalConstants.HEALTH_STATUS_CRITICAL);
    dcStatus.reset();
    dcStatus.get()
      .should.equal(globalConstants.HEALTH_STATUS_HEALTHY);
  });
});
