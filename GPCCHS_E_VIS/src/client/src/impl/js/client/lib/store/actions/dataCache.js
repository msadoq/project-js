import _ from 'lodash';
import simple from '../simpleActionCreator';
import * as types from '../types';
import dataMap from '../../mainProcess/data/dataMap';
import debug from '../../common/debug/mainDebug';

const logger = debug('store:action:dataCache');
/**
 * Simple actions
 */
export const writeOnePayload = simple(types.DATA_IMPORT_ONE_PAYLOAD, 'remoteId', 'localId', 'valuesToDisplay');
export const writeRangePayloads = simple(types.DATA_IMPORT_RANGE_PAYLOADS, 'remoteId', 'localId',
  'valuesToDisplay', 'interval');

function rangeValues(rIdData, lIdParam) {
  // rIdData = [ timestamp : value ]
  // lIdParam =
  // *          viewType: string,
  // *          field: string,
  // *          timebarId: string,
  // *          offset: number,
  // *          expectedInterval: [number, number],
  const lower = lIdParam.expectedInterval[0];
  const upper = lIdParam.expectedInterval[1];
  const displayedData = {};
  let lastIndex = 0;
  let lastTimestamp = 0;
  let indexes = [];
  _.each(rIdData, (value) => {
    const timestamp = value.timestamp;
    if (timestamp < lower || timestamp > upper) {
      return;
    }


    // add at the end
    if ((displayedData.length === 0) ||
      (timestamp > lastTimestamp && lastIndex === displayedData.length)) {
      lastIndex = displayedData.length;
      indexes.push(timestamp);
    } else {  // insertion
      const insertIndex = _.findIndex(
        indexes,
        time => time > timestamp,
        timestamp > lastTimestamp ? lastIndex : 0
      );
      indexes = _.concat(
        _.slice(indexes, 0, insertIndex), timestamp, _.slice(indexes, insertIndex)
      );
      lastIndex = insertIndex;
    }
    displayedData[timestamp] = value.payload[lIdParam.field];
    lastTimestamp = timestamp;
  });
  return displayedData;
}

function oneValue(rIdData, lIdParam, stateLocalId) {
  let displayedData = null;
  const lower = lIdParam.expectedInterval[0];
  const upper = lIdParam.expectedInterval[1];
  _.each(rIdData, (value) => {
    const timestamp = value.timestamp;
    if (timestamp < lower || timestamp > upper) {
      return;
    }

    const data = value.payload[lIdParam.field];
    if (!displayedData) {
      if (!stateLocalId || (stateLocalId && timestamp >= stateLocalId.timestamp)) {
        displayedData = Object.assign({}, { timestamp }, { value: data });
      }
    } else if (timestamp >= displayedData.timestamp) {
      displayedData = Object.assign({}, { timestamp }, { value: data });
    }
  });
  return displayedData;
}
// dataCache: {
//  'remoteId': {
//    'localId': { timestamp: 'timestamp', value: number }, // Text
//    'localId': {
//      index: [timestamp],
//      data: { 'timestamp': number }, // Plot
//    },
//  }
// }
export function importPayload(payload) {
  logger.debug('importPayload');
  return (dispatch, getState) => {
    // make your data computing
    const remoteIds = dataMap(getState());
    // Loop on remote IDs
    _.each(payload, (rIdData, remoteId) => {
      if (!remoteIds[remoteId]) {
        return;
      }
      // loop on local IDs
      _.each(remoteIds[remoteId].localIds, (lIdParam, localId) => {
        switch (lIdParam.viewType) {
          case 'PlotView': {
            const displayedData = rangeValues(rIdData, lIdParam);
            if (Object.keys(displayedData) === 0) {
              return;
            }
            dispatch(
              writeRangePayloads(remoteId, localId, displayedData, lIdParam.expectedInterval)
            );
            break;
          }
          case 'TextView': {
            const stateLocalId = _.get(getState(), ['dataCache', remoteId, localId], undefined);
            const displayedData = oneValue(rIdData, lIdParam, stateLocalId);
            if (!displayedData) {
              return;
            }
            dispatch(writeOnePayload(remoteId, localId, displayedData));
            break;
          }
          default :
        }
      });
    });
  };
}
