const { incomingPubSub } = require('../../../store/actions/incomingData');
const logger = require('../../../common/logManager')('controllers:onTimebasedArchiveData');
const { decode } = require('../../../utils/adapters');
/**
 * COntroller to handle pubsub data
 * @param {Array<Buffer>} args - Array of this form : [queryIdBuffer, dataIdBuffer,timestampBuffer1, payload1,...,timestampBuffer_n, payload_n ]
 * @param {function} getStore - Function that returns the current store
 */
const onPubSubData = (args, getStore) => {
  // args[0] is queryIdBuffer
  const dataIdBuffer = args[1];
  const dataIdDecoded = decode('dc.dataControllerUtils.DataId', dataIdBuffer);
  const payloadBuffers = Array.prototype.slice.call(args, 2);
  // check payloads parity
  if (payloadBuffers.length % 2 !== 0) {
    logger.warn('payloads should be sent by (timestamp, payloads) peers');
    return;
  }

  // dispatch pubsub data
  const store = getStore();
  store.dispatch(incomingPubSub(dataIdDecoded, payloadBuffers));
};

export default onPubSubData;
