const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onDcStatus');
const globalConstants = require('../../../constants');

const { add: addMessage } = require('../../../store/actions/messages');
const { getStore } = require('../../store');

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
  try {
    const status = decode('dc.dataControllerUtils.DcStatus', buffer).status;

    setDcStatus(
      (status === globalConstants.DC_STATUS_CONGESTION)
      ? globalConstants.HEALTH_STATUS_CRITICAL
      : globalConstants.HEALTH_STATUS_HEALTHY
    );
  } catch (e) {
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    logger.error('error on processing buffer', e);
  }
};
