const { decode } = require('../../../../utils/adapters');
const logger = require('../../../../common/logManager')('controllers:ADESDBQuery');
const { pop } = require('../../../../common/callbacks');
const { add: addMessage } = require('../../../../store/actions/messages');
const { getStore } = require('../../../store');
const constants = require('../../../../constants');


const handleListString = (buffer, callback) => {
  const decoded = decode('dc.dataControllerUtils.ADEStringList', buffer);
  callback(decoded.values.map(stringValue => (
    {
      name: stringValue,
    }
  )));
};

const handleSingleString = (buffer, callback) => {
  const decoded = decode('dc.dataControllerUtils.String', buffer);
  callback(decoded.string);
};

const handleBoolean = (buffer, callback) => {
  const decoded = decode('dc.dataControllerUtils.Boolean', buffer);
  callback(decoded.boolean);
};

const handleItemStructure = (buffer, callback) => {
  const decoded = decode('dc.dataControllerUtils.ADEItemStructure', buffer);
  console.log(JSON.stringify(decoded));
  callback(decoded);
};

const SDBQueryTypeHandler = {
  [constants.ADE_SDB_RETRIEVE_CATALOGS]: handleListString,
  [constants.ADE_SDB_RETRIEVE_CATALOG_ITEMS]: handleListString,
  [constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_COMOBJECT]: handleListString,
  [constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_EXISTS]: handleBoolean,
  [constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_FIELD_UNIT]: handleSingleString,
  [constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_STRUCTURE]: handleItemStructure,
};

/**
 * Triggered on DC sdb request response.
 *
 * - decode and pass to registered callback
 *
 * @param args array
 */
module.exports = (buffers, requestId) => {
  logger.silly('called');
  const decodedQuery = decode('dc.dataControllerUtils.ADESDBQuery', buffers[0]);
  const callback = pop(requestId);
  try {
    const handler = SDBQueryTypeHandler[decodedQuery.method];
    if (!handler) {
      logger.error('Unknown SDB Query response type received');
      getStore().dispatch(addMessage('global', 'warning',
      'Unknown SDB Query response type received'));
      return;
    }
    handler(buffers[1], callback);
  } catch (e) {
    logger.error('error on processing buffer', e);
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    callback(e);
  }
};
