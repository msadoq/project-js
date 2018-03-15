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

const { incomingPubSub } = require('../../../../store/actions/incomingData');
const logger = require('../../../../common/logManager')('controllers:onTimebasedPubSubDataADE');
const { decode } = require('../../../../utils/adapters');
const { add: addMessage } = require('../../../../store/actions/messages');


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

  return ({ buffers, requestId }, getStore) => {
    // args[0] is queryIdBuffer
    // const requestCloneBuffer = buffers[0];
    try {
      const {
        sessionId,
        domainId,
        objectName,
        catalogName,
        itemName,
        providerFlow,
      } = decode('dc.dataControllerUtils.ADETimebasedSubscription', buffers[0]);

      const dataId = {
        sessionId,
        domainId,
        catalog: catalogName,
        comObject: objectName,
        parameterName: itemName,
        provider: providerFlow,
      };
      const payloadBuffers = Array.prototype.slice.call(buffers, 1);
      // check payloads parity
      if (payloadBuffers.length % 2 !== 0) {
        logger.warn('payloads should be sent by (timestamp, payloads) peers');
        return;
      }
      addToQueue(dataId, payloadBuffers);
      // dispatch pubsub data
      throttledDispatch(getStore());
    } catch (e) {
      getStore().dispatch(addMessage('global', 'warning',
        'error on processing header buffer '.concat(e)));
    }
  };
};

export default makeOnPubSubData;
