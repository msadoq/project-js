import { last, has, each, concat, slice, findIndex, get, set, find } from 'lodash';
import vivl from '../../../VIVL/main';
import simple from '../simpleActionCreator';
import * as types from '../types';
import dataMap from '../../mainProcess/data/dataMap';
import debug from '../../common/debug/mainDebug';

const logger = debug('store:action:dataCache');

export const writePayload = simple(types.DATA_IMPORT_PAYLOAD, 'valuesToDisplay');

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

            set(bag, ['range', remoteId, localId],
            { data: newData, interval: lIdParam.expectedInterval });
            break;
          }
          default:
            logger.warn(`unknown view type ${lIdParam.viewType}`);
        }
      });
    });
    dispatch(writePayload(bag));
  };
}
