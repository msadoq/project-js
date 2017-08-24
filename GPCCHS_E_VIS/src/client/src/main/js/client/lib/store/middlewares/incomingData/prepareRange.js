import _isEmpty from 'lodash/isEmpty';
import _isBuffer from 'lodash/isBuffer';
import * as types from '../../types';
import { newData } from '../../actions/incomingData';
import { decode, getType } from '../../../utils/adapters';
import dataMapGenerator from '../../../dataManager/map';
import { isTimestampInLastInterval } from '../../../dataManager/mapSelector';
import { add } from '../../../serverProcess/models/tbdIdDataIdMap';

const { dumpBuffer } = require('../../../serverProcess/utils/dumpBuffer');

const prepareRange = lokiManager => ({ dispatch, getState }) => next => (action) => { // eslint-disable-line
  const nextAction = next(action);
  if (action.type === types.INCOMING_RANGE_DATA) {
    const tbdId = action.payload.tbdId;
    const dataId = action.payload.dataId;
    const peers = action.payload.peers;
    const payloadProtobufType = getType(dataId.comObject);
    add(tbdId, dataId);
    if (typeof payloadProtobufType === 'undefined') {
      console.error('protobufType unknown');
      return nextAction;
    }

    const payloadsJson = { [tbdId]: {} };
    const dataMap = dataMapGenerator(getState());
    let index = 0;
    if (dataMap.expectedRangeIntervals[tbdId]) {
      while (index + 1 < peers.length) {
        // pop the first two buffers from list
        // const payloadBuffer = peers.splice(0, 2);
        // robustness code, LPISIS could send empty ZeroMQ frame
        if (_isBuffer(peers[index]) && _isBuffer(peers[index + 1])) {
          try {
            const timestamp = decode('dc.dataControllerUtils.Timestamp', peers[index]).ms;
            dumpBuffer(dataId, timestamp, peers[index + 1]);
            const payload = decode(payloadProtobufType, peers[index + 1]);
            lokiManager.addRecord(tbdId, { timestamp, payload });
            // dump: if activated, save a file per timestamp with binary payload

            // queue new data in spool
            payloadsJson[tbdId][timestamp] = payload;
          } catch (e) {
            console.error(e);
          }
        }
        index += 2;
      }
    } else {
      while (index + 1 < peers.length) {
        // pop the first two buffers from list
        // const payloadBuffer = peers.splice(0, 2);

        // robustness code, LPISIS could send empty ZeroMQ frame
        if (_isBuffer(peers[index]) && _isBuffer(peers[index + 1])) {
          try {
            const timestamp = decode('dc.dataControllerUtils.Timestamp', peers[index]).ms;
            // dump: if activated, save a file per timestamp with binary payload
            dumpBuffer(dataId, timestamp, peers[index + 1]);
            const payload = decode(payloadProtobufType, peers[index + 1]);
            lokiManager.addRecord(tbdId, { timestamp, payload });
            if (isTimestampInLastInterval(dataMap, { tbdId, timestamp })) {
              payloadsJson[tbdId][timestamp] = payload;
            }
          } catch (e) {
            console.error(e);
          }
        }
        index += 2;
      }
    }
    // If data nedds to be send to reducers, dispatch action
    if (!_isEmpty(payloadsJson[tbdId])) dispatch(newData(payloadsJson));
  }
  return nextAction;
};

export default prepareRange;
