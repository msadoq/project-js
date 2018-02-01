// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : move dumpBuffer use in a specific middleware
// END-HISTORY
// ====================================================================

import _isBuffer from 'lodash/isBuffer';
import { dumpBuffer } from 'serverProcess/utils/dumpBuffer';
import * as types from 'store/types';
import { decode } from 'utils/adapters';
import executionMonitor from 'common/logManager/execution';
import { DUMP_EXTENSIONS } from 'constants';

const dumpBufferArchive = () => () => next => (action) => {
  const nextAction = next(action);
  if (action.type !== types.INCOMING_LAST_DATA
    && action.type !== types.INCOMING_RANGE_DATA) {
    return nextAction;
  }
  const execution = executionMonitor('middleware:dumpBufferArchive');
  execution.start('global');

  const dataId = action.payload.dataId;
  const peers = action.payload.peers;

  let index = 0;
  while (index + 1 < peers.length) {
    // robustness code, LPISIS could send empty ZeroMQ frame
    if (_isBuffer(peers[index]) && _isBuffer(peers[index + 1])) {
      execution.start('decode timestamp');
      const timestamp = decode('dc.dataControllerUtils.Timestamp', peers[index]).ms;
      execution.stop('decode timestamp');

      // save a file per timestamp with binary payload
      execution.start('dump buffer');
      dumpBuffer(dataId, timestamp, peers[index + 1], DUMP_EXTENSIONS.ARCHIVE);
      execution.stop('dump buffer');
    }
    index += 2;
  }

  execution.stop('global');
  execution.print();
  return nextAction;
};

export default dumpBufferArchive;
