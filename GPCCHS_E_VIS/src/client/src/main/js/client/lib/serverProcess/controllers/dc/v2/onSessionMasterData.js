// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

const logger = require('../../../../common/logManager')('controllers:onSessionMasterDataADE');
const { decode, getType } = require('../../../../utils/adapters');
const { pop } = require('../../../../common/callbacks');
const { add: addMessage } = require('../../../../store/actions/messages');
const { getStore } = require('../../../store');

/**
 * Triggered on DC master session request response.
 *
 * - decode and pass to registered callback
 *
 * @param args array
 */
module.exports = (buffers, requestId) => {
  logger.silly('called');

  const buffer = buffers[1];
  const callback = pop(requestId);

  try {
    const masterSessionId = decode(getType('UINTEGER'), buffer).value;
    callback(null, masterSessionId);
  } catch (e) {
    logger.error('error on processing buffer', e);
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    callback(e);
  }
};
