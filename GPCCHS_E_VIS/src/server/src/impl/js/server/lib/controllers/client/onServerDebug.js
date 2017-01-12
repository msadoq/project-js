const getModelState = require('../../utils/getModelsState');
const reply = require('common/ipc/reply');

/**
 * Triggered when developer request Loki models states
 *
 * - empty and returns current spooled data
 *
 * @param queryId
 */
module.exports = queryId => reply(queryId, { debug: getModelState() });
