const { reset: resetDataQueue } = require('../../models/dataQueue');
const { reset: resetLastPubSubTimestamp } = require('../../models/lastPubSubTimestamp');
const { get: getDcStatus } = require('../../models/dcStatus');
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
