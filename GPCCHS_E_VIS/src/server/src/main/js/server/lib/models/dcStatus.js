const globalConstants = require('common/constants');

let dcStatus;

module.exports = {
  set: (status) => {
    dcStatus = status;
  },
  get: () => dcStatus,
  reset: () => {
    dcStatus = globalConstants.HEALTH_STATUS_HEALTHY;
  },
};
