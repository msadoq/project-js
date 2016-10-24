import { last, has, each, concat, slice, findIndex, get, set, find } from 'lodash';
import vivl from '../../../VIVL/main';
import simple from '../simpleActionCreator';
import * as types from '../types';
import dataMap from '../../mainProcess/data/map/visible';
import debug from '../../common/debug/mainDebug';

const logger = debug('store:action:dataCache');

// simple action
export const removeDataCache = simple(types.DATA_REMOVE_ALL_DATACACHE);

// other action
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
  const newValue = {};
  each(rIdData, (value) => {
    const timestamp = value.timestamp;
    if (timestamp < lower || timestamp > upper) {
      return;
    }
    newValue[timestamp] = value.payload[lIdParam.field];
  });
  return newValue;
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
export function selectData(state, remoteIds, payload) {
  const bag = {};
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
          set(bag, ['data', remoteId, localId], newData);
          break;
        }
        case 'range': {
          const newData = rangeValues(remoteIdData, lIdParam);
          if (Object.keys(newData) === 0) {
            return;
          }

          set(bag, ['data', remoteId, localId], newData);
          set(bag, ['intervalToKeep', remoteId, localId], lIdParam.expectedInterval);
          break;
        }
        default:
          logger.warn(`unknown view type ${lIdParam.viewType}`);
      }
    });
  });
  return bag;
}
export function importPayload(payload) {
  return (dispatch, getState) => {
    const state = getState();
    const remoteIds = dataMap(state);
    const bag = selectData(state, remoteIds, payload);

    dispatch({
      type: types.DATA_IMPORT_PAYLOAD,
      payload: bag,
    });
  };
}
