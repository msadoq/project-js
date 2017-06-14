const logger = require('../../../common/logManager')('controllers:onDcStatus');
const { decode } = require('common/protobuf');
const globalConstants = require('../../../constants');

const { set: setDcStatus } = require('../../models/dcStatus');

/**
 * Triggered on DC domain request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports = (buffer) => {
  logger.silly('called');

  const status = decode('dc.dataControllerUtils.DcStatus', buffer).status;

  setDcStatus(
    (status === globalConstants.DC_STATUS_CONGESTION)
    ? globalConstants.HEALTH_STATUS_CRITICAL
    : globalConstants.HEALTH_STATUS_HEALTHY
  );
};
