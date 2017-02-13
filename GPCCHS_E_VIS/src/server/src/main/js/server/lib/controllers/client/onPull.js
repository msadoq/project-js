const { reset: resetDataQueue } = require('../../models/dataQueue');

/**
 * Triggered when HSC main process pull data spooled by HSC
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
      data: resetDataQueue(),
    }
  );
};
