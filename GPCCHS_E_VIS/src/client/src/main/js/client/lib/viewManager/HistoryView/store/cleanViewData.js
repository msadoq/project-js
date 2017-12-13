/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _difference from 'lodash/difference';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';
import _last from 'lodash/last';
import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';
import _split from 'lodash/split';
import _pick from 'lodash/pick';
import { HISTORYVIEW_SEPARATOR } from 'constants';

/* ************************************************
 * Clean viewData for current viewData
 * @param currentState view data State
 * @param oldViewFromMap current view definition
 * @param newViewFromMap current view definition
 * @param oldIntervals expected intervals for all entry points
 * @param newIntervals expected intervals for all entry points
 * @param historyConfig configuration of current history view
 * @return cleaned state for current view
/** *********************************************** */
export default function cleanCurrentViewData(
  currentState,
  oldViewFromMap,
  newViewFromMap,
  oldIntervals,
  newIntervals,
  historyConfig
) {
  // Check if viewMap has changed
  if (_isEqual(newViewFromMap, oldViewFromMap) && _isEqual(oldIntervals, newIntervals)) {
    return currentState;
  }
  // new visible view
  if (!oldViewFromMap || !currentState) {
    return currentState;
  }
  let newState = currentState;
  // invisible view
  if (!newViewFromMap) {
    return {
      cols: [],
      lines: [],
      data: {},
      indexes: {},
    };
  }
  // entry point updates
  const oldEntryPoints = oldViewFromMap.entryPoints;
  const newEntryPoints = newViewFromMap.entryPoints;
  const epNames = Object.keys(oldEntryPoints);
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];
    const oldEp = oldEntryPoints[epName];
    const newEp = newEntryPoints[epName];
    // check if only label has changed
    if (!newEp) {
      const diff = _difference(Object.keys(newEntryPoints), Object.keys(oldEntryPoints));
      let newLabel;
      diff.forEach((name) => {
        if (newEntryPoints[name].id === oldEp.id) {
          newLabel = name;
        }
      });
      if (newLabel) {
        newState = updateEpLabel(newState, epName, newLabel);
        continue;
      }
    }
    // removed entry point if invalid
    // EP definition modified: remove entry point from viewData
    if (isInvalidEntryPoint(oldEp, newEp)) {
      newState = removeEpData(newState, epName, historyConfig);
      continue;
    }
    // Case of point already in error
    if (newEp.error) {
      continue;
    }
    // update on expected interval
    // If EP is valid, old and new tbdId are the same
    // Consider new localId to take into account offset modification
    const oldInterval = _get(oldIntervals, [oldEp.tbdId, oldEp.localId, 'expectedInterval']);
    const newInterval = _get(newIntervals, [oldEp.tbdId, newEp.localId, 'expectedInterval']);
    if (!newInterval || oldEp.localId !== newEp.localId) {
      newState = removeEpData(newState, epName, historyConfig);
    } else if (oldInterval &&
      (oldInterval[0] !== newInterval[0] || oldInterval[1] !== newInterval[1])) {
      const lower = newInterval[0] + newEp.offset;
      const upper = newInterval[1] + newEp.offset;
      newState = removeViewDataByEp(newState, epName, lower, upper, historyConfig);
    }
  }
  return newState;
}
function removeEpData(state, epName) {
  let newState = _omit(state, ['data', epName]);
  newState = _omit(newState, ['indexes', epName]);
  // const hiddenCols = historyConfig.hiddenCols;

  newState.lines = [];
  for (let i = 0; i < state.lines.length; i += 1) {
    const args = _split(state.lines[i], HISTORYVIEW_SEPARATOR);
    if (args.length !== 2) {
      continue;
    }
    if (args[0] !== epName) {
      newState.lines.push(state.lines[i]);
    }
  }
  if (!newState.data) {
    newState.data = {};
    newState.indexes = {};
  }
  return newState;
}

function isInvalidEntryPoint(oldEp, newEp) {
  if (!newEp || (newEp.error && newEp.error !== oldEp.error)
    || oldEp.field !== newEp.field  // TODO check if this comparison is ok
    || oldEp.tbdId !== newEp.tbdId) {
    return true;
  }
  return false;
}


export function updateEpLabel(viewData, oldLabel, newLabel) {
  if (!oldLabel || !newLabel || oldLabel === newLabel) {
    return viewData;
  }
  // unknown label
  if (!viewData.data || !viewData.data[oldLabel]) {
    return viewData;
  }
  let newState = _omit(viewData, ['data', oldLabel]);
  if (!newState.data) {
    newState.data = {};
  }
  newState.data[newLabel] = viewData.data[oldLabel];
  newState = _omit(newState, ['indexes', oldLabel]);
  if (!newState.indexes) {
    newState.indexes = {};
  }
  newState.indexes[newLabel] = viewData.indexes[oldLabel];
  // Update ep name in 'lines' table
  newState.lines = [];
  for (let i = 0; i < viewData.lines.length; i += 1) {
    const args = _split(viewData.lines[i], HISTORYVIEW_SEPARATOR);
    if (args.length !== 2) {
      continue;
    }
    if (args[0] === oldLabel) {
      newState.lines.push(newLabel.concat(' ').concat(args[1]));
    }
  }

  return newState;
}


export function removeViewDataByEp(viewData, epName, lower, upper) { // , historyConfig);
  if (lower > upper) {
    // unpredictable usage
    return removeEpData(viewData, epName); // , historyConfig);
  }
  // keep everything
  if (!viewData || !viewData.indexes
    || !viewData.indexes[epName] || !viewData.indexes[epName].length) {
    // state contains no data
    return viewData;
  }
  // all points of entryPoint are in visuWindow
  if (viewData.indexes[epName][0] >= lower && _last(viewData.indexes[epName]) <= upper) {
    return viewData;
  }
  // drop everything
  if (viewData.indexes[epName][0] > upper || _last(viewData.indexes[epName]) < lower) {
    return removeEpData(viewData, epName);
  }
  // keep some
  // cut: keep inside min and max
  const iLower = _findIndex(viewData.indexes[epName], val => val >= lower);
  let iUpper = _findLastIndex(viewData.indexes[epName], val => val <= upper);
  iUpper = (iUpper === -1) ? viewData.indexes[epName].length - 1 : iUpper;

  const newIndexes = viewData.indexes[epName].slice(iLower, iUpper + 1);
  const newLines = [];
  for (let i = 0; i < viewData.lines.length; i += 1) {
    const args = _split(viewData.lines[i], HISTORYVIEW_SEPARATOR);
    if (args[0] !== epName || (args[1] >= lower && args[1] <= upper)) {
      newLines.push(viewData.lines[i]);
    }
  }

  return {
    ...viewData,
    data: {
      ...viewData.data,
      [epName]: _pick(viewData.data[epName], newIndexes),
    },
    indexes: {
      ...viewData.indexes,
      [epName]: newIndexes,
    },
    lines: newLines,
  };
}
