import { each, findIndex, findLastIndex, concat, omit } from 'lodash';
import { constants as globalConstants } from 'common';
import * as types from '../types';

export default function viewData(stateViewData = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_VIEWDATA: {
      const views = action.payload.viewData;
      const newState = {};
      each(views, (view, viewId) => {
        switch (view.structureType) {
          case globalConstants.DATASTRUCTURETYPE_LAST: {
            newState[viewId] = { ...stateViewData[viewId], ...omit(view, ['structureType']) };
            break;
          }
          case globalConstants.DATASTRUCTURETYPE_RANGE: {
            newState[viewId] = {}; // index: [], columns: [] };
            if (stateViewData[viewId] && view.remove) {
              newState[viewId] = cleanRangeData(
                stateViewData[viewId],
                { type: 'DATA_IMPORT_VIEWDATA', payload: view.remove }
                );
            }
            if (view.add) {
              newState[viewId] = updateRangeData(
                newState[viewId],
                { type: 'DATA_IMPORT_VIEWDATA', payload: view.add }
                );
            }
            break;
          }
          default:
            return;
        }
      });
      return { ...stateViewData, ...newState };
    }
    case types.DATA_REMOVE_ALL_VIEWDATA:
      return {};
    default:
      return stateViewData;
  }
}
// Clean values outside the expected interval
export function cleanRangeData(viewSubState = {}, action) {
  if (!viewSubState || !viewSubState.index || viewSubState.index.length === 0) {
    return viewSubState;
  }
  switch (action.type) {
    case types.DATA_IMPORT_VIEWDATA: {
      // master's timestamp (arbitrary determined from the first entryPoint)
      const lower = action.payload.lower;
      const upper = action.payload.upper;
      const newState = { index: [], columns: [] };

      const iLower = findIndex(viewSubState.index, t => t >= lower);
      let iUpper = -1;
      if (iLower >= 0) {
        const l = viewSubState.index.length;
        if (viewSubState.index[l - 1] > upper) {
          iUpper = findLastIndex(viewSubState.index, t => t <= upper);
        }
      }
      // All data to erase
      if (iLower < 0) {
        return newState;
      }
      // All data to keep
      if (iLower === 0 && iUpper < 0) {
        return viewSubState;
      }
      if (iUpper >= 0) {
        newState.index = viewSubState.index.slice(iLower, iUpper + 1);
        newState.columns = viewSubState.columns.slice(iLower, iUpper + 1);
      } else {
        newState.index = viewSubState.index.slice(iLower);
        newState.columns = viewSubState.columns.slice(iLower);
      }
      return newState;
    }
    default:
      return viewSubState;
  }
}
// viewParam = {
// type: string,
// entryPoints: {
//   'name': {
//     remoteId,
//     fieldX: string,
//     fieldY: string,
//     offset: number,
//     expectedInterval: [number, number],
//   },
// }}
export function updateRangeData(viewSubState = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_VIEWDATA: {
      // Check presence of payloads
      const timestamps = Object.keys(action.payload);
      if (timestamps.length === 0) {
        return viewSubState;
      }
      const newState = { ...viewSubState };
      if (!newState.index) {
        newState.index = [];
        newState.columns = [];
      }
      let lastIndex = 0;
      // newState[masterTime][epName] =
      //   { x: value.payload[ep.fieldX], value: value.payload[ep.fieldY] };
      each(timestamps, (time) => {
        const timestamp = parseInt(time, 10);
        const value = action.payload[time];
        if (lastIndex === -1) {
          newState.columns.push({ ...value, x: timestamp });
          newState.index.push(timestamp);
        } else {
          const index = findIndex(newState.index, t => t >= timestamp, lastIndex);
          lastIndex = index;
          if (index === -1) {
            newState.columns.push({ ...value, x: timestamp });
            newState.index.push(timestamp);
          } else if (newState.index[index] === timestamp) {
            // update
            newState.columns[index] = { ...newState.columns[index], ...value };
          } else { // add
            newState.index = concat(newState.index.slice(0, index),
              timestamp, newState.index.slice(index));
            newState.columns = concat(newState.columns.slice(0, index),
              { ...value, x: timestamp }, newState.columns.slice(index));
          }
        }
      });
      return newState;
    }
    default:
      return viewSubState;
  }
}
