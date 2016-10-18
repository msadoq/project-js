import { last, has, each, concat, slice, findIndex, get, set, find } from 'lodash';
import vivl from '../../../VIVL/main';
import simple from '../simpleActionCreator';
import * as types from '../types';
import dataMap from '../../mainProcess/data/dataMap';
import debug from '../../common/debug/mainDebug';

const logger = debug('store:action:dataCache');

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
  each(rIdData, (value) => {
    const timestamp = value.timestamp;
    if (timestamp < lower || timestamp > upper) {
      return;
    }

    if ((displayedData.length === 0) ||
      (timestamp > lastTimestamp && lastIndex === displayedData.length)) {
      // add at the end
      lastIndex = displayedData.length;
      indexes.push(timestamp);
    } else {
      // insertion
      const insertIndex = findIndex(
        indexes,
        time => time > timestamp,
        timestamp > lastTimestamp ? lastIndex : 0
      );
      indexes = concat(
        slice(indexes, 0, insertIndex), timestamp, slice(indexes, insertIndex)
      );
      lastIndex = insertIndex;
    }
    displayedData[timestamp] = value.payload[lIdParam.field];
    lastTimestamp = timestamp;
  });
  return displayedData;
}

function oneValue(remoteIdData, lIdParam, stateLocalId) {
  let newValue = null;
  const lower = lIdParam.expectedInterval[0];
  const current = lIdParam.expectedInterval[1];
  each(remoteIdData, (p) => {
    const timestamp = p.timestamp;
    if (timestamp < lower || timestamp > current) {
      return;
    }

    const value = p.payload[lIdParam.field];
    if (!newValue) {
      // compare with previous state
      if (!stateLocalId || (stateLocalId && timestamp >= stateLocalId.timestamp)) {
        newValue = { timestamp, value };
      }
    } else if (timestamp >= newValue.timestamp) {
      // compare with previously found eligible value
      newValue = { timestamp, value };
    }
  });
  return newValue;
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
    const state = getState();
    const remoteIds = dataMap(state);

    const bag = {
      one: {},
      range: {},
    };

    // remoteId
    each(payload, (remoteIdData, remoteId) => {
      if (!has(remoteIds, [remoteId])) {
        return;
      }

      // localId
      each(remoteIds[remoteId].localIds, (lIdParam, localId) => {
        const dataLayout = vivl(lIdParam.viewType, 'dataLayout')();
        switch (dataLayout) {
          case 'one': {
            const currentSubState = get(state, ['dataCache', remoteId, localId]);
            const newData = oneValue(remoteIdData, lIdParam, currentSubState);
            if (!newData) {
              return;
            }

            set(bag, ['one', remoteId, localId], newData);
            break;
          }
          case 'range': {
            const newData = rangeValues(remoteIdData, lIdParam);
            if (Object.keys(newData) === 0) {
              return;
            }

            set(bag, ['range', remoteId, localId], newData);
            break;
          }
          default:
            logger.warn(`unknown view type ${lIdParam.viewType}`);
        }
      });
    });
  };

  // TODO dispatch
  // dispatch(writeOnePayload(remoteId, localId, displayedData));
  // dispatch(writeRangePayloads(remoteId, localId, newData, lIdParam.expectedInterval));
}
