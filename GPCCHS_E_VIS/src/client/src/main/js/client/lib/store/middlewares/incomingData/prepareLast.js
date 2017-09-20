import _isEmpty from 'lodash/isEmpty';
import _isBuffer from 'lodash/isBuffer';
import * as types from '../../types';
import { newData } from '../../actions/incomingData';
import { decode, getType } from '../../../utils/adapters';
import { add } from '../../../serverProcess/models/tbdIdDataIdMap';
import executionMonitor from '../../../common/logManager/execution';
import { add as addMessage } from '../../../store/actions/messages';

const logger = require('../../../common/logManager')('middleware:prepareRange');

const prepareLast = () => ({ dispatch }) => next => (action) => {
  const nextAction = next(action);
  if (action.type !== types.INCOMING_LAST_DATA) {
    return nextAction;
  }

  const execution = executionMonitor('middleware:prepareLast');
  execution.start('global');

  const tbdId = action.payload.tbdId;
  const dataId = action.payload.dataId;
  const peers = action.payload.peers;
  add(tbdId, dataId);

  const payloadProtobufType = getType(dataId.comObject);
  const payloadsJson = { [tbdId]: {} };
  let index = 0;
  while (index + 1 < peers.length) {
    try {
      // robustness code, LPISIS could send empty ZeroMQ frame
      if (_isBuffer(peers[index]) && _isBuffer(peers[index + 1])) {
        execution.start('decode timestamp');
        const timestamp = decode('dc.dataControllerUtils.Timestamp', peers[index]).ms;
        execution.stop('decode timestamp');

        execution.start('decode payload');
        const payload = decode(payloadProtobufType, peers[index + 1]);
        execution.stop('decode payload');

        // queue new data in spool
        payloadsJson[tbdId][timestamp] = payload;
      }
    } catch (e) {
      dispatch(addMessage('global', 'warning', 'error on processing header buffer '.concat(e)));
      logger.error('error on processing buffer', e);
    }
    index += 2;
  }

  if (!_isEmpty(payloadsJson[tbdId])) {
    dispatch(newData(payloadsJson));
  }

  execution.stop('global');
  execution.print();
  return nextAction;
};

export default prepareLast;
