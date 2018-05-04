import _isEmpty from 'lodash/isEmpty';
import _isBuffer from 'lodash/isBuffer';
import * as types from 'store/types';
import { newData } from 'store/actions/incomingData';
import { decode, getType } from 'utils/adapters';
import dataMapGenerator from 'dataManager/map';
import { isTimestampInLastInterval } from 'dataManager/mapSelector';
import executionMonitor from 'common/logManager/execution';
import { add as addMessage } from 'store/actions/messages';

const logger = require('../../../common/logManager')('middleware:prepareRangeADE');

const prepareObsoleteEvent = lokiObsoleteEventManager => ({ dispatch, getState }) => next => (action) => {
  const nextAction = next(action);
  if (action.type !== types.INCOMING_OBSOLETE_EVENT) {
    return nextAction;
  }

  const execution = executionMonitor('middleware:prepareObsoleteEventADE');
  execution.start('global');
  let index = 0;
  const tbdId = action.payload.tbdId;
  const dataId = action.payload.dataId;
  const peers = action.payload.peers;

  while (index + 1 < peers.length) {
    // robustness code, LPISIS could send empty ZeroMQ frame
    if (_isBuffer(peers[index]) && _isBuffer(peers[index + 1])) {
      try {
        execution.start('decode timestamp');
        const timestamp = decode('dc.dataControllerUtils.Timestamp', peers[index]).ms;
        execution.stop('decode timestamp');

        execution.start('decode payload');
        const decoded = decode('dc.dataControllerUtils.ADEPayload', peers[index + 1]);
        const decodedPayload = decode(getType(decoded.header.comObjectType), decoded.payload);
        // console.log(JSON.stringify(decodedPayload, null, 2));
        const specificAttributes = decodedPayload.specificAttributes;
        const eventDate = decodedPayload.eventDate.value;
        let parameterName = '';
        if (specificAttributes[0].name.value === 'ParameterName') {
          parameterName = specificAttributes[0].value.value;
        } else {
          parameterName = specificAttributes[1].value.value;
        }
        const jsonPayload = {
          eventDate,
        };
        execution.stop('decode payload');
        execution.start('addRecord');
        const flatId = `${parameterName}:${dataId.sessionId}:${dataId.domainId}`;
        lokiObsoleteEventManager.addRecord(flatId, { timestamp: eventDate, payload: jsonPayload });
        execution.stop('addRecord');
      } catch (e) {
        logger.error('error on processing buffer', e);
        dispatch(addMessage('global', 'warning', 'error on processing header buffer '.concat(e)));
      }
    }
    index += 2;
  }

  execution.stop('global', `${peers.length / 2} payloads`);
  execution.print();
  return nextAction;
};

export default prepareObsoleteEvent;
