const { reset: resetDataQueue } = require('../../models/dataQueue');
const onDataPull = require('./onDataPull');
/**
 * Triggered when HSC main process pull data spooled by HSC
 *
 * - empty and returns current spooled data
 *
 * @param reply
 * @param queryId
 */
module.exports = (reply, queryId, { queries }) => {
  // Add data to queue using queries
  onDataPull({ queries });
  // send data to client
  reply(
    queryId,
    {
      data: resetDataQueue(),
    }
  );
};
