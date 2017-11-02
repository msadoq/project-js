/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _last from 'lodash/last';
import _pick from 'lodash/pick';
import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';
import getLogger from '../../../common/logManager';

const logger = getLogger('view:OnBoardAlarmView:cleanViewData');

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
    return {
      lines: {},
      indexes: [],
    };
  }
  // entry point updates
  const oldEntryPoints = oldViewFromMap.entryPoints;
  const newEntryPoints = newViewFromMap.entryPoints;
  const epNames = Object.keys(oldEntryPoints);
  // only one entry point is displayed in a OnBoard alarm view
  if (epNames.length !== 1) {
    return currentState;
  }
  const epName = epNames[0];
  const oldEp = oldEntryPoints[epName];
  const newEp = newEntryPoints[epName];

  // removed entry point if invalid
  // EP definition modified: remove entry point from viewData
  if (isInvalidEntryPoint(oldEp, newEp)) {
    return {
      lines: {},
      indexes: [],
    };
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
    return {
      lines: {},
      indexes: [],
    };
  } else if (oldInterval &&
    (oldInterval[0] !== newInterval[0] || oldInterval[1] !== newInterval[1])) {
    const lower = newInterval[0] + newEp.offset;
    const upper = newInterval[1] + newEp.offset;
    newState = removeViewDataOutOfBounds(newState, epName, lower, upper);
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


export function removeViewDataOutOfBounds(viewData, epName, lower, upper) {
  if (lower > upper) {
    logger.warn('Received invalid bounds');
    return {
      lines: [],
      indexes: [],
    };
  }

  // --- Keep everything --- //

  // state contains no data
  if (!viewData || !viewData.indexes || !viewData.indexes.length) {
    return viewData;
  }

  // All points of entryPoint are in visuWindow
  if (viewData.indexes[0] >= lower && _last(viewData.indexes) <= upper) {
    return viewData;
  }

  // --- Drop everything --- //

  if (viewData.indexes[0] > upper || _last(viewData.indexes) < lower) {
    return {
      lines: [],
      indexes: [],
    };
  }

  // --- Keep some --- //

  const iLower = _findIndex(viewData.indexes, val => val >= lower);
  let iUpper = _findLastIndex(viewData.indexes, val => val <= upper);
  iUpper = (iUpper === -1) ? viewData.lines.length - 1 : iUpper;

  const newIndexes = viewData.indexes.slice(iLower, iUpper + 1);
  const newLines = _pick(viewData.lines, newIndexes);

  return {
    lines: newLines,
    indexes: newIndexes,
  };
}
