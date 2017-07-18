const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onDcStatus');
const globalConstants = require('../../../constants');

const { set: setDcStatus } = require('../../models/dcStatus');

/**
 * Triggered on DC domain request response.
 *
 * - decode and pass to registered callback
 *
 * @param args array
 */
module.exports = (args) => {
  logger.silly('called');

  const buffer = args[0];

  const status = decode('dc.dataControllerUtils.DcStatus', buffer).status;

  setDcStatus(
    (status === globalConstants.DC_STATUS_CONGESTION)
    ? globalConstants.HEALTH_STATUS_CRITICAL
    : globalConstants.HEALTH_STATUS_HEALTHY
  );
};
