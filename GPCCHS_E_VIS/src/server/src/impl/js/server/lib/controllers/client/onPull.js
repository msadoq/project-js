const { reset } = require('../../utils/dataQueue');

/**
 * Triggered when HSC main process pull data spooled by HSC
 *
 * - empty and returns current spooled data
 *
 * @param queryId
 */
module.exports = (reply, queryId) => reply(queryId, reset());
