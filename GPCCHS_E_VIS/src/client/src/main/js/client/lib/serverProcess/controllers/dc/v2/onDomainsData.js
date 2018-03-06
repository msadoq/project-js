// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Modify protobuf loading strategy : - Move adapters in another folder - New architecture generated for adapters folder - Add raw adapter mechanism
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Fix "Maximum call stack exceeded" due to ES6 transpilation of rest operator in function arguments that use .apply() in ES5
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