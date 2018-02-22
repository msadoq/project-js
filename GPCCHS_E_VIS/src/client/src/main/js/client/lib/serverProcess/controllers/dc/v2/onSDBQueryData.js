const { decode } = require('../../../../utils/adapters');
const logger = require('../../../../common/logManager')('controllers:ADESDBQuery');
const { pop } = require('../../../../common/callbacks');
const { add: addMessage } = require('../../../../store/actions/messages');
const { getStore } = require('../../../store');

/**
 * Triggered on DC sdb request response.
 *
 * - decode and pass to registered callback
 *
 * @param args array
 */
module.exports = (buffers, requestId) => {
  logger.silly('called');
  const callback = pop(requestId);
  try {
    const decoded = decode('dc.dataControllerUtils.ADEStringList', buffers[1]);
    callback(decoded.values.map(stringValue => (
      {
        name: stringValue,
      }
    )));
  } catch (e) {
    logger.error('error on processing buffer', e);
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    callback(e);
  }
};
