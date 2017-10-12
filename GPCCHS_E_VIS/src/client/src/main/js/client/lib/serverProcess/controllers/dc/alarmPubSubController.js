import _ from 'lodash/fp';
import flattenDataId from '../../../common/flattenDataId';

const { incomingPubSubAlarm } = require('../../../store/actions/incomingData');
const logger = require('../../../common/logManager')('controllers:onAlarmPubSubData');
const { decode } = require('../../../utils/adapters');
const { add: addMessage } = require('../../../store/actions/messages');


/**
 * Controller to handle pubsub data
 * @param {Array<Buffer>} args - Array of this form : [queryIdBuffer, dataIdBuffer,timestampBuffer1, payload1,...,timestampBuffer_n, payload_n ]
 * @param {function} getStore - Function that returns the current store
 */
const makeOnPubSubAlarmData = (timing) => {
  let queue = {};

  const throttledDispatch = _.throttle(timing, (store) => {
    store.dispatch(incomingPubSubAlarm(queue));
    queue = {};
  });

  const addToQueue = (dataIdDecoded, alarmTypeDecoded, alarmModeDecoded, payloadBuffer) => {
    const flatten = flattenDataId(dataIdDecoded);
    if (queue[flatten]) {
      queue[flatten].payloadBuffers = [...queue[flatten].payloadBuffers, ...payloadBuffer];
    } else {
      queue[flatten] = {
        dataId: dataIdDecoded,
        alarmType: alarmTypeDecoded,
        alarmMode: alarmModeDecoded,
        payloadBuffers: [...payloadBuffer],
      };
    }
  };

  return (args, getStore) => {
    // args[0] is queryIdBuffer
    const dataIdBuffer = args[1];
    const alarmTypeBuffer = args[2];
    const alarmModeBuffer = args[3];
    let dataIdDecoded;
    let alarmTypeDecoded;
    let alarmModeDecoded;

    try {
      dataIdDecoded = decode('dc.dataControllerUtils.DataId', dataIdBuffer);
      alarmTypeDecoded = decode('dc.dataControllerUtils.AlarmType', alarmTypeBuffer);
      alarmModeDecoded = decode('dc.dataControllerUtils.AlarmMode', alarmModeBuffer);
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
    addToQueue(dataIdDecoded, alarmTypeDecoded, alarmModeDecoded, payloadBuffers);
    // dispatch pubsub data
    throttledDispatch(getStore());
  };
};

export default makeOnPubSubAlarmData;
