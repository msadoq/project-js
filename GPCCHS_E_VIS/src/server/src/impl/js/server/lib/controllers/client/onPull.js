const { reset: resetDataQueue } = require('../../utils/dataQueue');
const { get: getDcStatus } = require('../../utils/dcStatus');

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
      dcStatus: getDcStatus(),
      data: resetDataQueue(),
    }
  );
};
