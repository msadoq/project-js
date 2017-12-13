// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : Modify pubSub Controller to send dataId decoded
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : Add pubsub controller and its test
// VERSION : 1.1.2 : FA : #7578 : 23/08/2017 : Add throttle mechanism to pubSubController
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add throttle timing in configuration .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import flattenDataId from 'common/flattenDataId';

const { incomingPubSub } = require('../../../store/actions/incomingData');
const logger = require('../../../common/logManager')('controllers:onTimebasedPubSubData');
const { decode } = require('../../../utils/adapters');
const { add: addMessage } = require('../../../store/actions/messages');


/**
 * COntroller to handle pubsub data
 * @param {Array<Buffer>} args - Array of this form : [queryIdBuffer, dataIdBuffer,timestampBuffer1, payload1,...,timestampBuffer_n, payload_n ]
 * @param {function} getStore - Function that returns the current store
 */
const makeOnPubSubData = (timing) => {
  let queue = {};

  const throttledDispatch = _.throttle(timing, (store) => {
    store.dispatch(incomingPubSub(queue));
    queue = {};
  });

  const addToQueue = (dataIdDecoded, payloadBuffer) => {
    const flatten = flattenDataId(dataIdDecoded);
    if (queue[flatten]) {
      queue[flatten].payloadBuffers = [...queue[flatten].payloadBuffers, ...payloadBuffer];
    } else {
      queue[flatten] = {
        dataId: dataIdDecoded,
        payloadBuffers: [...payloadBuffer],
      };
    }
  };

  return (args, getStore) => {
    // args[0] is queryIdBuffer
    const dataIdBuffer = args[1];
    let dataIdDecoded;
    try {
      dataIdDecoded = decode('dc.dataControllerUtils.DataId', dataIdBuffer);
    } catch (e) {
      logger.error('error on processing buffer', e);
      getStore().dispatch(addMessage('global', 'warning',
        'error on processing header buffer '.concat(e)));
      return;
    }
    const payloadBuffers = Array.prototype.slice.call(args, 2);
    // check payloads parity
    if (payloadBuffers.length % 2 !== 0) {
      logger.warn('payloads should be sent by (timestamp, payloads) peers');
      return;
    }
    addToQueue(dataIdDecoded, payloadBuffers);
    // dispatch pubsub data
    throttledDispatch(getStore());
  };
};

export default makeOnPubSubData;
