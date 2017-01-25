const { reset: resetDataQueue } = require('../../utils/dataQueue');
const { reset: resetLastPubSubTimestamp } = require('../../utils/lastPubSubTimestamp');
const { get: getDcStatus } = require('../../utils/dcStatus');
const getHealthStatus = require('../../utils/health');

/**
 * Triggered when HSC main process pull data spooled by HSC
 *
 * - empty and returns current spooled data
 *
 * @param queryId
 */
module.exports = (reply, queryId) => {
  reply(
    queryId,
    {
      lastPubSubTimestamp: resetLastPubSubTimestamp(),
      dcStatus: getDcStatus(),
      hssStatus: getHealthStatus(),
      data: resetDataQueue(),
    }
  );
};
