// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

const { decode } = require('../../../../utils/adapters');
const logger = require('../../../../common/logManager')('controllers:onDomainDataADE');
const { pop } = require('../../../../common/callbacks');
const { add: addMessage } = require('../../../../store/actions/messages');
const { getStore } = require('../../../store');

/**
 * Triggered on DC domain request response.
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
    const { domains } = decode('dc.dataControllerUtils.Domains', buffer);
    callback(null, domains);
  } catch (e) {
    logger.error('error on processing buffer', e);
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    callback(e);
  }
};
