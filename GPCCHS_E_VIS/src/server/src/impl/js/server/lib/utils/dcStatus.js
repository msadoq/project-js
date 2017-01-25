const globalConstants = require('common/constants');

let dcStatus = globalConstants.DC_STATUS_HEALTHY;

module.exports = {
  set: (status) => {
    dcStatus = status;
  },
  get: () => dcStatus,
  reset: () => {
    dcStatus = globalConstants.DC_STATUS_HEALTHY;
  },
};
