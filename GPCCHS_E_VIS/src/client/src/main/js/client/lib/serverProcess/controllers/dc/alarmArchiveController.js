const { decode } = require('../../../utils/adapters');
const executionMonitor = require('../../../common/logManager/execution');
const logger = require('../../../common/logManager')('controllers:onArchiveAlarmData');
const { incomingRange } = require('../../../store/actions/incomingData');


const onArchiveAlarmData = (args, getStore, { get }) => {
  const queryIdBuffer = args[0];
  // args[1] is dataIdBuffer (not used in current implementation)
  // const alarmTypeBuffer = args[2];
  // const alarmModeBuffer = args[3];

  const payloadBuffers = Array.prototype.slice.call(args, 4);
  // check payloads parity
  if (payloadBuffers.length % 2 !== 0) {
    logger.warn('payloads should be sent by (timestamp, payloads) peers');
    return;
  }

  const execution = executionMonitor('archiveAlarmData');
  execution.start('global');

  execution.start('decode queryId');
  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  execution.stop('decode queryId');

  execution.start('register query');
  const requestData = get(queryId);
  if (!requestData) {
    logger.error('Already received isLast for this given queryId');
    return;
  }
  const { tbdId, type, dataId } = requestData;
  const store = getStore();
  if (typeof tbdId === 'undefined') {
    return;
  }

  if (typeof dataId === 'undefined') {
    logger.error(`Unknown data id for request queryId: ${queryId}, tbdId: ${tbdId}, type: ${type}`);
    return;
  }
  store.dispatch(incomingRange(tbdId, payloadBuffers, dataId));
};

export default onArchiveAlarmData;
