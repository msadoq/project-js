import { each, parseInt, reduce, set, get, concat, findLastIndex, findIndex, has } from 'lodash';
import profiling from '../debug/profiling';
import debug from '../debug/mainDebug';
import vivl from '../../../VIVL/main';
import getViewDefinitions from './map/visibleViews';
import { importPayload } from '../../store/actions/viewData';

const logger = debug('data:inject');

// Clean values outside the expected interval
export function cleanRangeData(viewSubState, ep, epName) {
  // Check presence of data in state
  if (!get(viewSubState, ['index', epName])) {
    return undefined;
  }
  const lower = ep.expectedInterval[0];
  const upper = ep.expectedInterval[1];

  const iLine = findIndex(viewSubState.lines, l => l.name === epName);
  if (iLine < 0) {
    throw new Error(`Invalid state for ${epName}: line definition missing`);
  }
  const newState = { index: {}, columns: [], lines: [viewSubState.lines[iLine]] };
  newState.index[epName] = [];
  newState.columns[epName] = [];

  const iLower = findIndex(viewSubState.index[epName], t => t >= lower);
  let iUpper = -1;
  if (iLower >= 0) {
    const l = viewSubState.index[epName].length;
    if (viewSubState.index[epName][l - 1] > upper) {
      iUpper = findLastIndex(viewSubState.index[epName], t => t <= upper);
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
    newState.index[epName] = viewSubState.index[epName].slice(iLower, iUpper + 1);
    newState.columns[epName] = viewSubState.columns[epName].slice(iLower, iUpper + 1);
  } else {
    newState.index[epName] = viewSubState.index[epName].slice(iLower);
    newState.columns[epName] = viewSubState.columns[epName].slice(iLower);
  }
  return newState;
}
// viewParam = {
// type: string,
// entryPoints: {
//   'name': {
//     remoteId,
//     fieldX: string,
//     fieldY: string,
//     color: string,
//     expectedInterval: [number, number],
//   },
// }}
// remoteIdData = [ timestamp, value ]
export function rangeValues(remoteIdPayload, ep, epName, key, epState) {
  const lower = ep.expectedInterval[0];
  const upper = ep.expectedInterval[1];
  let lastTime = 0;
  let lastIndex = 0;
  let index = [];
  let columns = [];
  let stateLength = 0;
  if (epState && epState.index) {
    index = epState.index[epName];
    columns = epState.columns[epName];
    stateLength = index.length;
  }
  each(remoteIdPayload, (value) => {
    const timestamp = value.timestamp;
    // check value in interval
    if (timestamp < lower || timestamp > upper) {
      return;
    }

    // Find index
    let indexToInsert = -1;
    if (timestamp > lastTime) {
      indexToInsert = findIndex(index, t => t >= timestamp, lastIndex);
    } else {
      indexToInsert = findIndex(index, t => t >= timestamp);
    }
    const object = { x: value.payload[ep.fieldX] };
    object[key] = value.payload[ep.fieldY];
    if (indexToInsert < 0) {
      index.push(timestamp);
      columns.push(object);
    } else if (index[indexToInsert] === timestamp) {
      columns[indexToInsert] = object;
    } else {
      index = concat(index.slice(0, indexToInsert), timestamp, index.slice(indexToInsert));
      columns = concat(columns.slice(0, indexToInsert), object, columns.slice(indexToInsert));
    }
    lastTime = timestamp;
    lastIndex = indexToInsert;
  });
  if (index.length > 0 && stateLength !== index.length) {
    const newEpState = { index: {}, lines: { key, name: epName }, columns: {} };
    newEpState.index[epName] = index;
    newEpState.columns[epName] = columns;
    return newEpState;
  }
  return epState;
}


// Get the nearest value from the current time
export function oneValue(remoteIdPayload, ep, epName, viewSubState) {
  // Entry points on this remoteId
  const lower = ep.expectedInterval[0];
  const current = ep.expectedInterval[1];
  // previous time recorded
  let previousTime = 0;
  if (viewSubState && viewSubState.index[epName]) {
    if (viewSubState.index[epName] < current) {
      previousTime = viewSubState.index[epName];
    }
  }
  let newValue;
  // search over payloads
  each(remoteIdPayload, (p) => {
    const timestamp = p.timestamp;
    if (timestamp < lower || timestamp > current) {
      return;
    }
    if (timestamp >= previousTime) {
      newValue = { timestamp, value: p.payload[ep.field] };
      previousTime = timestamp;
    }
  });
  return newValue;
}

export function selectData(state, viewDefinitions, payload) {
  const bag = {};
  // remoteId
  each(viewDefinitions, (view, viewId) => {
    // Check view type
    const dataLayout = vivl(view.type, 'dataLayout')();
    switch (dataLayout) {
      case 'one': {
        // Entry points
        each(view.entryPoints, (ep, epName) => {
          // No payload for this remote Id
          if (!has(payload, ep.remoteId)) {
            return;
          }
          // Get current state for update
          const currentSubState = get(state, ['viewData', viewId]);
          // compute new data
          const newData = oneValue(payload[ep.remoteId], ep, epName, currentSubState);
          if (!newData) {
            return;
          }
          set(bag, [viewId, 'index', epName], newData.timestamp);
          set(bag, [viewId, 'values', epName], newData.value);
        });
        break;
      }
      case 'range': {
        let oldKey;
        each(view.entryPoints, (ep, epName) => {
          // No payload for this remote Id
          if (!has(payload, ep.remoteId)) {
            return;
          }
          // Get current state for update
          const currentSubState = get(state, ['viewData', viewId]);

          const epSubState = cleanRangeData(currentSubState, ep, epName);
          let isModified = false;
          if (currentSubState && epSubState !== currentSubState) {
            isModified = true;
          }
          let key;
          if (epSubState) {
            key = epSubState.lines.key;
            oldKey = key;
          } else if (!currentSubState || !currentSubState.viewData[viewId]) {
            if (!oldKey) {
              key = 'col1';
              oldKey = key;
            } else {
              key = `col${parseInt(oldKey.substr(3)) + 1}`;
              oldKey = key;
            }
          } else {
            let newIndex = reduce(currentSubState.viewData[viewId].lines, (lastK, l) => {
              const current = parseInt(l.key.substr(3));
              if (lastK < current) {
                return current + 1;
              }
              return lastK;
            }, 1);
            if (oldKey && newIndex === oldKey) {
              newIndex += 1;
            }
            oldKey = newIndex;
            key = `col${newIndex}`;
          }
          const data = rangeValues(payload[ep.remoteId], ep, epName, key, epSubState);
          if (!isModified && (!data || data.index.length === 0)) {
            return;
          }
          if (bag[viewId]) {
            Object.assign(bag[viewId].index, data.index);
            Object.assign(bag[viewId].columns, data.columns);
            bag[viewId].lines.push(data.lines);
          } else {
            set(bag, [viewId, 'index'], data.index);
            set(bag, [viewId, 'columns'], data.columns);
            (bag[viewId].lines || (bag[viewId].lines = [])).push(data.lines);
          }
        });
        break;
      }
      default:
        logger.warn(`unknown view type ${view.type}`);
    }
  });
  return bag;
}

export default function inject(state, dispatch, payload) {
  logger.verbose('begin');

  const start = profiling.start();
  const viewDefinitions = getViewDefinitions(state);
  const data = selectData(state, viewDefinitions, payload);
  dispatch(importPayload(data));

  profiling.stop(
    start,
    `dataInjection (${Object.keys(data).length ? Object.keys(data).length : 0} remoteId)`
  );
}
