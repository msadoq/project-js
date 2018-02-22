// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Add archive controller and its test
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Code robustness : ensure that there is a request for a given queryId in singleton
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : Add throttle mechanism in patch reducer
// VERSION : 1.1.2 : FA : #7858 : 18/09/2017 : Add robustness on 'dataId undefined' crash
// END-HISTORY
// ====================================================================

const executionMonitor = require('../../../../common/logManager/execution');
const logger = require('../../../../common/logManager')('controllers:onTimebasedArchiveDataADE');
const { incomingRange, incomingLast } = require('../../../../store/actions/incomingData');


const onArchiveData = ({ buffers, requestId, isLast }, getStore, { get, remove }) => {
  const payloadBuffer = Array.prototype.slice.call(buffers, 1);
  if (payloadBuffer.length % 2 !== 0) {
    logger.warn('payloads should be sent by (timestamp, payloads) peers');
    return;
  }

  const execution = executionMonitor('archiveData');
  execution.start('register query');
  const requestData = get(requestId);
  // JUst to ensure the request exists in the singleton
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
    logger.error(`Unknown data id for request queryId: ${requestId}, tbdId: ${tbdId}, type: ${type}`);
    return;
  }

  if (isLast) {
    remove(requestId);
  }
  switch (type) {
    case 'RANGE' :
      store.dispatch(incomingRange(tbdId, payloadBuffer, dataId));
      break;
    case 'LAST' :
      store.dispatch(incomingLast(tbdId, payloadBuffer, dataId));
      break;
    default:
      logger.warn('Unkwnown type of request');
      break;
  }
};

export default onArchiveData;
