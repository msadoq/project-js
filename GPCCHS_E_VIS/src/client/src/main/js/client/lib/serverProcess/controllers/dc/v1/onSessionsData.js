// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

const { decode } = require('../../../../utils/adapters');
const logger = require('../../../../common/logManager')('controllers:onSessionData');
const { pop } = require('../../../../common/callbacks');
const { add: addMessage } = require('../../../../store/actions/messages');
const { getStore } = require('../../../store');

/**
 * Triggered on DC session request response.
 *
 * - decode and pass to registered callback
 *
 * @param args array
 */
module.exports = (args) => {
  logger.silly('called');
  const queryIdBuffer = args[0];
  const buffer = args[1];

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.silly('decoded queryId', queryId);
  const callback = pop(queryId);
  try {
    const { sessions } = decode('dc.dataControllerUtils.Sessions', buffer);
    callback(null, sessions);
  } catch (e) {
    logger.error('error on processing buffer', e);
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    callback(e);
  }
};
