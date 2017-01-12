const { reset } = require('../../utils/dataQueue');
const reply = require('common/ipc/reply');

/**
 * Triggered when HSC main process pull data spooled by HSC
 *
 * - empty and returns current spooled data
 *
 * @param queryId
 */
module.exports = queryId => reply(queryId, reset());
