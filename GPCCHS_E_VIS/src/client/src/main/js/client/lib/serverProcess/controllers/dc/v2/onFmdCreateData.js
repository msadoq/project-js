// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

const { decode } = require('../../../../utils/adapters');
const logger = require('../../../../common/logManager')('controllers:onFmdCreateDataADE');

const { pop } = require('../../../../common/callbacks');
const { add: addMessage } = require('../../../../store/actions/messages');
const { getStore } = require('../../../store');

/**
 * Triggered on create FMD document response
 *
 * - decode and pass to registered callback
 *
 * @param reply function
 * @param args array
 */
module.exports = (buffers, requestId) => {
  logger.silly('called');

  const callback = pop(requestId);
  logger.silly('decoded queryId', requestId);
  try {
    callback(decode('dc.dataControllerUtils.FMDFileInfo', buffers[1]));
  } catch (e) {
    logger.error(`error on processing buffer ${e}`);
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    callback({ err: e });
  }
};
