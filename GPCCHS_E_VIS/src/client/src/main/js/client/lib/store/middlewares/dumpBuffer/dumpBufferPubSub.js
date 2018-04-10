// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : move dumpBuffer use in a specific middleware
// VERSION : 2.0.0 : DM : #5806 : 13/10/2017 : change middleware behavior to manage alarm pubsub
//  data
// VERSION : 2.0.0 : DM : #9217 : 13/11/2017 : Add extensions for dump buffer
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _isBuffer from 'lodash/isBuffer';
import { dumpBuffer } from 'serverProcess/utils/dumpBuffer';
import * as types from 'store/types';
import { decode } from 'utils/adapters';
import executionMonitor from 'common/logManager/execution';
import { DUMP_EXTENSIONS } from 'constants';

const dumpBufferPubSub = () => () => next => (action) => {
  const nextAction = next(action);
  if (action.type !== types.INCOMING_PUBSUB_DATA
    && action.type !== types.INCOMING_PUBSUBALARM_DATA
  ) {
    return nextAction;
  }
  const execution = executionMonitor('middleware:dumpBufferPubSub');
  execution.start('global');

  // check payloads parity
  const payloadBuffersMap = action.payload.data;
  const payloadBuffersArray = Object.keys(payloadBuffersMap);

  for (let i = 0; i < payloadBuffersArray.length; i += 1) {
    const { dataId, payloadBuffers } = payloadBuffersMap[payloadBuffersArray[i]];
    // Reduce peers as data by decoding timestamp buffers
    // Loop over peers and for each decode timestamp
    let iBuffer = 0;
    while (iBuffer < payloadBuffers.length) {
      // Get elements by peer
      const timeBuffer = payloadBuffers[iBuffer];
      const dataBuffer = payloadBuffers[iBuffer + 1];
      iBuffer += 2;
      // robustness code, LPISIS could send empty ZeroMQ frame
      if (_isBuffer(timeBuffer) && _isBuffer(dataBuffer)) {
        execution.start('decode timestamp');
        const timestamp = decode('dc.dataControllerUtils.Timestamp', timeBuffer);
        execution.stop('decode timestamp');

        // save a file per timestamp with binary payload
        execution.start('dump buffer');
        dumpBuffer(dataId, timestamp.ms, dataBuffer, DUMP_EXTENSIONS.PUB_SUB);
        execution.stop('dump buffer');
      }
    }
  }

  execution.stop('global');
  execution.print();
  return nextAction;
};

export default dumpBufferPubSub;
