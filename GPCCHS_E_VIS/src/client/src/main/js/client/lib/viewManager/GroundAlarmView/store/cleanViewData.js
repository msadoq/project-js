/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _last from 'lodash/last';
import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';
import _pick from 'lodash/pick';

/* ************************************************
 * Clean viewData for current viewData
 * @param currentState view data State
 * @param oldViewFromMap current view definition
 * @param newViewFromMap current view definition
 * @param oldIntervals expected intervals for all entry points
 * @param newIntervals expected intervals for all entry points
 * @return cleaned state for current view
/** *********************************************** */
export default function cleanCurrentViewData(
  currentState,
  oldViewFromMap,
  newViewFromMap,
  oldIntervals,
  newIntervals
) {
  // Check if viewMap has changed
  if (_isEqual(newViewFromMap, oldViewFromMap) && _isEqual(oldIntervals, newIntervals)) {
    return currentState;
  }
  // new visible view
  if (!oldViewFromMap || !currentState) {
    return currentState;
  }
  // invisible view
  if (!newViewFromMap) {
    return { lines: [], data: {}, transitionNb: 0 };
  }
  // entry point updates
  const oldEntryPoints = oldViewFromMap.entryPoints;
  const newEntryPoints = newViewFromMap.entryPoints;
  const epNames = Object.keys(oldEntryPoints);
  // only one entry point is displayed in a ground alarm view
  if (epNames.length !== 1) {
    return currentState;
  }
  const epName = epNames[0];
  const oldEp = oldEntryPoints[epName];
  const newEp = newEntryPoints[epName];

  // removed entry point if invalid
  // EP definition modified: remove entry point from viewData
  if (isInvalidEntryPoint(oldEp, newEp)) {
    return { lines: [], data: {}, transitionNb: 0 };
  }
  // Case of point already in error
  if (newEp.error) {
    return currentState;
  }
  let newState = currentState;
  // update on expected interval
  // If EP is valid, old and new tbdId are the same
  // Consider new localId to take into account offset modification
  const oldInterval = _get(oldIntervals, [oldEp.tbdId, oldEp.localId, 'expectedInterval']);
  const newInterval = _get(newIntervals, [oldEp.tbdId, newEp.localId, 'expectedInterval']);
  if (!newInterval || oldEp.localId !== newEp.localId) {
    return { lines: [], data: {}, transitionNb: 0 };
  } else if (oldInterval &&
    (oldInterval[0] !== newInterval[0] || oldInterval[1] !== newInterval[1])) {
    const lower = newInterval[0] + newEp.offset;
    const upper = newInterval[1] + newEp.offset;
    newState = removeViewDataByEp(newState, epName, lower, upper);
  }
  return newState;
}

function isInvalidEntryPoint(oldEp, newEp) {
  if (!newEp || (newEp.error && newEp.error !== oldEp.error)
    || oldEp.tbdId !== newEp.tbdId) {
    return true;
  }
  return false;
}


export function removeViewDataByEp(viewData, epName, lower, upper) {
  if (lower > upper) {
    // unpredictable usage
    return { lines: [], data: {}, transitionNb: 0 };
  }
  // keep everything
  if (!viewData || !viewData.lines || !viewData.lines.length) {
    // state contains no data
    return viewData;
  }
  // all points of entryPoint are in visuWindow
  if (viewData.lines[0] >= lower && _last(viewData.lines) <= upper) {
    return viewData;
  }
  // drop everything
  if (viewData.lines[0] > upper || _last(viewData.lines) < lower) {
    return { lines: [], data: {}, transitionNb: 0 };
  }
  // keep some
  // cut: keep inside min and max
  const iLower = _findIndex(viewData.lines, val => val >= lower);
  let iUpper = _findLastIndex(viewData.lines, val => val <= upper);
  iUpper = (iUpper === -1) ? viewData.lines.length - 1 : iUpper;

  const newLines = viewData.lines.slice(iLower, iUpper + 1);
  const newData = _pick(viewData.data[epName], newLines);
  // Compute transitionNb by removing erased data
  let removedTransitions = 0;
  // lower
  for (let i = 0; i < iLower; i += 1) {
    const timestamp = viewData.lines[i];
    if (viewData.data[timestamp].transitions) {
      removedTransitions += viewData.data[timestamp].transitions.length;
    }
  }
  // upper
  for (let i = iUpper + 1; i < viewData.lines.length; i += 1) {
    const timestamp = viewData.lines[i];
    if (viewData.data[timestamp].transitions) {
      removedTransitions += viewData.data[timestamp].transitions.length;
    }
  }

  return {
    data: newData,
    lines: newLines,
    transitionNb: viewData.transitionNb - removedTransitions,
  };
}
