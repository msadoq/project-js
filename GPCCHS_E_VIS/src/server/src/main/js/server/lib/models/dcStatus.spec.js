require('../utils/test');
const dcStatus = require('./dcStatus');
const globalConstants = require('common/constants');

describe('models/dcStatus', () => {
  beforeEach(() => {
    dcStatus.reset();
  });
  it('get', () => {
    dcStatus.get()
      .should.equal(globalConstants.DC_STATUS_HEALTHY);
  });
  it('set', () => {
    dcStatus.set(globalConstants.DC_STATUS_CONGESTION);
    dcStatus.get()
      .should.equal(globalConstants.DC_STATUS_CONGESTION);
  });
  it('reset', () => {
    dcStatus.set(globalConstants.DC_STATUS_CONGESTION);
    dcStatus.reset();
    dcStatus.get()
      .should.equal(globalConstants.DC_STATUS_HEALTHY);
  });
});
