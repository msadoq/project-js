const { reset: resetLastPubSubTimestamp } = require('../../models/lastPubSubTimestamp');
const { get: getDcStatus } = require('../../models/dcStatus');
const getHealthStatus = require('../../utils/health');

/**
 * Triggered when HSC main process pull health status
 *
 * - empty and returns current spooled data
 *
 * @param reply
 * @param queryId
 */
module.exports = (reply, queryId) => {
  reply(
    queryId,
    {
      lastPubSubTimestamp: resetLastPubSubTimestamp(),
      dcStatus: getDcStatus(),
      hssStatus: getHealthStatus(),
    }
  );
};
