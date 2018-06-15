// ====================================================================
// HISTORY
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix parseEntryPoint to take into account
//  provider field and update dc stubs
// VERSION : 2.0.0.2 : FA : #11628 : 18/04/2018 : fix display in every view
// END-HISTORY
// ====================================================================

const executionMonitor = require('common/logManager/execution');
const logger = require('common/logManager')('controllers:onTimebasedArchiveDataADE');
const { incomingRange, incomingLast } = require('store/actions/incomingData');
const { add: addMessage } = require('store/actions/messages');


const onArchiveData = ({ buffers, requestId, isLast }, getStore, { get, remove }) => {
  try {
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
  } catch (e) {
    const errorMessage = ''.concat(e);
    getStore().dispatch(addMessage('global', 'warning', errorMessage));
    logger.error(e);
  }
};

export default onArchiveData;
