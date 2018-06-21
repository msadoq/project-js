
// const { decode, getType } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:PUS:onInitialize');

const { incomingPusRange } = require('store/actions/pus');

// const { pop } = require('../../../common/callbacks');
// const { add: addMessage } = require('../../../store/actions/messages');

/**
 * Triggered on DC domain request response.
 *
 * - decode and pass to registered callback
 *
 * @param args array
 */
module.exports = (buffers, getStore) => {
  logger.silly('called');
  const store = getStore();
  store.dispatch(incomingPusRange({ test: 'bonjour' }));
  // const buffer = buffers[0];
  // const callback = pop(requestId);

  // try {
  //   const { pusWholeModel /* ,delta */ } = decode('pusActor.pusUtils.PusOnInitialize', buffer);
  //   const { /* modelUniqueId, */ pusName, payload } = pusWholeModel;
  //   // console.log('Type ', getType(pusName));
  //   const pusDecoded = decode(getType(pusName), payload);
  //   logger.info(pusDecoded);
  //   // callback(null, domains);
  // } catch (e) {
  //   logger.error('error on processing buffer', e);
  //   getStore().dispatch(addMessage('global', 'warning',
  //     'error on processing header buffer '.concat(e)));
  //   // callback(e);
  // }


};
