const { decode, encode } = require('../../../utils/adapters');
const executionMonitor = require('../../../common/logManager/execution');
const logger = require('../../../common/logManager')('controllers:onTimebasedArchiveData');
const { incomingRange, incomingLast } = require('../../../store/actions/incomingData');


const protobufTrue = encode('dc.dataControllerUtils.Boolean', { boolean: true });

const onArchiveData = (args, getStore, { get, remove }) => {
  const queryIdBuffer = args[0];
  // args[1] is dataIdBuffer (not used in current implementation)
  const isLastBuffer = args[2];

  const payloadBuffers = Array.prototype.slice.call(args, 3);
  const endOfQuery = protobufTrue.equals(isLastBuffer);
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
  const { tbdId, type, dataId } = get(queryId);
  const store = getStore();
  if (typeof tbdId === 'undefined') {
    return;
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
