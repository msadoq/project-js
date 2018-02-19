// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Add archive controller and its test
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Code robustness : ensure that there is a request for a given queryId in singleton
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : Add throttle mechanism in patch reducer
// VERSION : 1.1.2 : FA : #7858 : 18/09/2017 : Add robustness on 'dataId undefined' crash
// END-HISTORY
// ====================================================================

const { decode, encode } = require('../../../../utils/adapters');
const executionMonitor = require('../../../../common/logManager/execution');
const logger = require('../../../../common/logManager')('controllers:onTimebasedArchiveData');
const { incomingRange, incomingLast } = require('../../../../store/actions/incomingData');


const protobufTrue = encode('dc.dataControllerUtils.Boolean', { boolean: true });

const onArchiveData = ({ buffers, requestId, isLast, isError }, getStore, { get, remove }) => {
  // const queryIdBuffer = args[0];
  // args[1] is dataIdBuffer (not used in current implementation)
  // const isLastBuffer = args[2];

  // const payloadBuffers = Array.prototype.slice.call(args, 3);
  // const endOfQuery = protobufTrue.equals(isLastBuffer);
  // check payloads parity
  const requestCloneBuffer = buffers[0];
  const payloadBuffer = Array.prototype.slice.call(buffers, 1);
  if (payloadBuffer.length % 2 !== 0) {
    logger.warn('payloads should be sent by (timestamp, payloads) peers');
    return;
  }

  const execution = executionMonitor('archiveData');
  // if queryId not in registeredQueries, stop logic
  execution.start('register query');
  // TODO remove and implement a clean RPC with DC that take all query response chunk in one line
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
  console.log(type);
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
