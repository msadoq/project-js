import _isEmpty from 'lodash/isEmpty';
import _isBuffer from 'lodash/isBuffer';
import * as types from '../../types';
import { injectNewData } from '../../actions/incomingData';
import { decode, getType } from '../../../utils/adapters';
import dataMapGenerator from '../../../dataManager/map';
import { isTimestampInLastInterval } from '../../../dataManager/mapSelector';

const { dumpBuffer } = require('../../../serverProcess/utils/dumpBuffer');

const prepareRange = lokiManager => ({ dispatch, getState }) => next => (action) => { // eslint-disable-line
  if (action.type === types.INCOMING_RANGE_DATA) {
    console.log('[PrepareRangeMiddleware] ON_INCOMING_RANGE_DATA action');
    const tbdId = action.payload.tbdId;
    const dataId = action.payload.dataId;
    const peers = action.payload.peers;
    const payloadProtobufType = getType(dataId.comObject);

    if (typeof payloadProtobufType === 'undefined') {
      console.log('protobufType unknwon');
      return next(action);
    }

    const payloadsJson = {};
    const dataMap = dataMapGenerator(getState());
    if (dataMap.expectedRangeIntervals[tbdId]) {
      while (peers.length) {
        // pop the first two buffers from list
        const payloadBuffer = peers.splice(0, 2);
        // robustness code, LPISIS could send empty ZeroMQ frame
        if (!_isBuffer(payloadBuffer[0]) || !_isBuffer(payloadBuffer[1])) {
          // loggerData.warn(`received an empty ZeroMQ frame from DC for ${remoteId}`);
          // eslint-disable-next-line no-continue, "DV6 TBC_CNES LPISIS use continue to preserve readability and avoid long block in an if condition"
          continue;
        }

        const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]).ms;
        const payload = decode(payloadProtobufType, payloadBuffer[1]);
        lokiManager.addRecord(tbdId, { timestamp, payload });
        // dump: if activated, save a file per timestamp with binary payload
        dumpBuffer(dataId, timestamp, payloadBuffer[1]);

        // queue new data in spool
        payloadsJson[timestamp] = payload;
      }
    } else {
      while (peers.length) {
        // pop the first two buffers from list
        const payloadBuffer = peers.splice(0, 2);

        // robustness code, LPISIS could send empty ZeroMQ frame
        if (!_isBuffer(payloadBuffer[0]) || !_isBuffer(payloadBuffer[1])) {
          // loggerData.warn(`received an empty ZeroMQ frame from DC for ${remoteId}`);
          // eslint-disable-next-line no-continue, "DV6 TBC_CNES LPISIS use continue to preserve readability and avoid long block in an if condition"
          continue;
        }
        const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]).ms;
        console.log(dataMap.expectedLastIntervals);
        if (isTimestampInLastInterval(dataMap, { tbdId, timestamp } )) {
          const payload = decode(payloadProtobufType, payloadBuffer[1]);
          payloadsJson[timestamp] = payload;
        }

        // dump: if activated, save a file per timestamp with binary payload
        dumpBuffer(dataId, timestamp, payloadBuffer[1]);
      }
    }
    // If data nedds to be send to reducers, dispatch action
    if (!_isEmpty(payloadsJson)) dispatch(injectNewData(tbdId, payloadsJson));
  }
  return next(action);
};

export default prepareRange;
