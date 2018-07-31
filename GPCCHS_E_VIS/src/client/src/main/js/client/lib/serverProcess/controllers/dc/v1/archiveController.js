// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

import _get from 'lodash/get';

const { decode, encode } = require('../../../../utils/adapters');
const executionMonitor = require('../../../../common/logManager/execution');
const logger = require('../../../../common/logManager')('controllers:onTimebasedArchiveData');
const { incomingRange, incomingLast } = require('../../../../store/actions/incomingData');

const protobufTrue = () => encode('dc.dataControllerUtils.Boolean', { boolean: true });
const PARAMETER_NAME = 'parameterName';

const onArchiveData = (args, getStore, { get, remove }) => {
  const queryIdBuffer = args[0];
  const dataIdBuffer = args[1];
  const isLastBuffer = args[2];

  const payloadBuffers = Array.prototype.slice.call(args, 3);
  const endOfQuery = protobufTrue().equals(isLastBuffer);
  // check payloads parity
  if (payloadBuffers.length % 2 !== 0) {
    logger.warn('payloads should be sent by (timestamp, payloads) peers');
    return;
  }

  const execution = executionMonitor('archiveData');
  execution.start('global');

  execution.start('decode queryId');
  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  execution.stop('decode queryId');

  // if queryId not in registeredQueries, stop logic
  execution.start('register query');
  // TODO remove and implement a clean RPC with DC that take all query response chunk in one line
  const requestData = get(queryId);
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
    logger.error(`Unknown data id for request queryId: ${queryId}, tbdId: ${tbdId}, type: ${type}`);
    return;
  }

  // @see Mantis#9217 Ajouter une trace dans les logs quand des données reçues ont un dataId qui ne correspond pas au dataId attendue
  const dataIdDecoded = decode('dc.dataControllerUtils.String', dataIdBuffer).string;
  if (_get(dataId, PARAMETER_NAME, null) && dataId[PARAMETER_NAME] !== dataIdDecoded) {
    logger.error(`dataId parameter received [${dataId[PARAMETER_NAME]}] is not the expected one [${dataIdDecoded}]`);
  }

  if (endOfQuery) {
    remove(queryId);
  }
  switch (type) {
    case 'RANGE' :
      store.dispatch(incomingRange(tbdId, payloadBuffers, dataId));
      break;
    case 'LAST' :
      store.dispatch(incomingLast(tbdId, payloadBuffers, dataId));
      break;
    default:
      logger.warn('Unkwnown type of request');
      break;
  }
};

export default onArchiveData;
