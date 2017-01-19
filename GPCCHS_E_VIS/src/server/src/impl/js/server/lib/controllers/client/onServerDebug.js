const getModelState = require('../../utils/getModelsState');

/**
 * Triggered when developer request Loki models states
 *
 * - empty and returns current spooled data
 *
 * @param queryId
 */
module.exports = (reply, queryId) => reply(queryId, { debug: getModelState() });
