import _isEmpty from 'lodash/isEmpty';
import _isBuffer from 'lodash/isBuffer';
import * as types from 'store/types';
import { newData } from 'store/actions/incomingData';
import executionMonitor from 'common/logManager/execution';
import { add as addMessage } from 'store/actions/messages';
import { getFlattenDataIdForObsoleteEvent } from 'common/flattenDataId';
import { add } from '../../../serverProcess/models/tbdIdDataIdMap';
import { decode, decodePayload, getTypeAggreg } from '../../../utils/adapters';


const logger = require('../../../common/logManager')('middleware:prepareObsoleteEventADE');

const prepareObsoleteEvent =
  lokiObsoleteEventManager => ({ dispatch }) => next => (action) => {
    const nextAction = next(action);
    if (action.type !== types.INCOMING_OBSOLETE_EVENT) {
      return nextAction;
    }

    const execution = executionMonitor('middleware:prepareObsoleteEventADE');
    execution.start('global');

    const dataId = action.payload.dataId;
    const peers = action.payload.peers;
    const flatId = getFlattenDataIdForObsoleteEvent(dataId);

    const payloadsJson = { [flatId]: {} };

    let index = 0;

    while (index + 1 < peers.length) {
      // robustness code, LPISIS could send empty ZeroMQ frame
      if (_isBuffer(peers[index]) && _isBuffer(peers[index + 1])) {
        try {
          execution.start('decode timestamp');
          const timestamp = decode('dc.dataControllerUtils.Timestamp', peers[index]).ms;
          execution.stop('decode timestamp');

          execution.start('decode payload');
          const decoded = decodePayload(peers[index + 1]);
          const decodedPayload = decode(getTypeAggreg('LogbookEvent'), decoded);
          const eventDate = decodedPayload.eventDate.value;
          const obsoleteEventDecodedPayload = {
            eventDate,
            referenceTimestamp: decodedPayload.referenceTimestamp,
          };
          execution.stop('decode payload');
          add(flatId, dataId);
          execution.start('addRecord');
          lokiObsoleteEventManager.addRecord(
            flatId, {
              timestamp: eventDate,
              payload: obsoleteEventDecodedPayload,
            }
          );
          execution.stop('addRecord');

          execution.start('persist');
          payloadsJson[flatId][timestamp] = obsoleteEventDecodedPayload;
          execution.stop('persist');
        } catch (e) {
          logger.error('error on processing buffer', e);
          console.log(e);
          dispatch(addMessage('global', 'warning', 'error on processing header buffer '.concat(e)));
        }
      }
      index += 2;
    }

    // If data needs to be send to reducers, dispatch action
    if (!_isEmpty(payloadsJson[flatId])) {
      dispatch(newData({ obsoleteEvents: payloadsJson }));
    }

    execution.stop('global', `${peers.length / 2} payloads`);
    execution.print();
    return nextAction;
  };

export default prepareObsoleteEvent;
