// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Fix prepare last error . .
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add execution map trace in three middlewares to make
//  performance analysis easier
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : move dumpBuffer use in a specific middleware
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _isEmpty from 'lodash/isEmpty';
import _isBuffer from 'lodash/isBuffer';
import * as types from 'store/types';
import { newData } from 'store/actions/incomingData';
import { decode, getType } from 'utils/adapters';
import executionMonitor from 'common/logManager/execution';
import { add as addMessage } from 'store/actions/messages';
import { PREFIX_LASTS } from 'constants';

const logger = require('../../../common/logManager')('middleware:prepareLast');

const prepareLast = () => ({ dispatch }) => next => (action) => {
  if (action.type !== types.INCOMING_LAST_DATA) {
    return next(action);
  }

  const execution = executionMonitor('middleware:prepareLast');
  execution.start('global');

  const tbdId = action.payload.tbdId;
  const dataId = action.payload.dataId;
  const peers = action.payload.peers;

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
    dispatch(newData({ [PREFIX_LASTS]: payloadsJson }));
  }

  execution.stop('global');
  execution.print();
  return next(action);
};

export default prepareLast;
