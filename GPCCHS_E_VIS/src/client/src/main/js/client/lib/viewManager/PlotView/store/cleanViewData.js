// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure + cleaning
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : fix plot view EP renaming
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : reduction of function complexity .
// VERSION : 1.1.2 : FA : #6717 : 18/05/2017 : Fix crash when an EP is associated with a timeline with offset
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// VERSION : 1.1.2 : DM : #6700 : 02/08/2017 : Update unit tests for Plot View store
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action viewData_clean
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console and spaced-comment.
// VERSION : 1.1.2 : FA : #7776 : 13/09/2017 : Fix plot drawing when timeline has offset
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Update plot view data structure to improve json patch
// END-HISTORY
// ====================================================================

/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _difference from 'lodash/difference';
import _get from 'lodash/get';
import _head from 'lodash/head';
import _last from 'lodash/last';
import _isEqual from 'lodash/isEqual';
import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';
import _omit from 'lodash/omit';
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
  newIntervals) {
  // Check if viewMap has changed
  if (_isEqual(newViewFromMap, oldViewFromMap) && _isEqual(oldIntervals, newIntervals)) {
    return currentState;
  }
  // new visible view
  if (!oldViewFromMap || !currentState || !Object.keys(currentState.indexes).length) {
    return currentState;
  }
  let newState = currentState;
  // invisible view
  if (!newViewFromMap) {
    return {
      indexes: {},
      lines: {},
      min: {},
      max: {},
      minTime: {},
      maxTime: {},
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
      newState = { ...newState,
        indexes: _omit(newState.indexes, epName),
        lines: _omit(newState.lines, epName),
        min: _omit(newState.min, epName),
        minTime: _omit(newState.minTime, epName),
        max: _omit(newState.max, epName),
        maxTime: _omit(newState.maxTime, epName),
      };
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
      newState = { ...newState,
        indexes: _omit(newState.indexes, epName),
        lines: _omit(newState.lines, epName),
        min: _omit(newState.min, epName),
        minTime: _omit(newState.minTime, epName),
        max: _omit(newState.max, epName),
        maxTime: _omit(newState.maxTime, epName),
      };
    } else if (oldInterval &&
      (oldInterval[0] !== newInterval[0] || oldInterval[1] !== newInterval[1])) {
      const lower = newInterval[0] + newEp.offset;
      const upper = newInterval[1] + newEp.offset;
      const newData = removeViewDataByEp(newState, epName, lower, upper);
      // Update of min and max if needed
      newState = scanForMinAndMax(newData);
    }
  }
  return newState;
}
function isInvalidEntryPoint(oldEp, newEp) {
  if (!newEp || (newEp.error && newEp.error !== oldEp.error)
    || oldEp.fieldX !== newEp.fieldX || oldEp.fieldY !== newEp.fieldY
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
  if (!viewData.lines[oldLabel]) {
    return viewData;
  }

  const newState = { ...viewData,
    lines: _omit(viewData.lines, oldLabel),
    indexes: _omit(viewData.indexes, oldLabel),
    min: _omit(viewData.min, oldLabel),
    minTime: _omit(viewData.minTime, oldLabel),
    max: _omit(viewData.max, oldLabel),
    maxTime: _omit(viewData.maxTime, oldLabel),
  };

  return { ...newState,
    lines: { ...newState.lines, [newLabel]: viewData.lines[oldLabel] },
    indexes: { ...newState.indexes, [newLabel]: viewData.indexes[oldLabel] },
    min: { ...newState.min, [newLabel]: viewData.min[oldLabel] },
    max: { ...newState.max, [newLabel]: viewData.max[oldLabel] },
    minTime: { ...newState.minTime, [newLabel]: viewData.minTime[oldLabel] },
    maxTime: { ...newState.maxTime, [newLabel]: viewData.maxTime[oldLabel] },
  };
}

// function used to update min and max when no data is added to state
export function scanForMinAndMax(viewDataState) {
  if (!viewDataState || !viewDataState.indexes || !Object.keys(viewDataState.indexes).length) {
    return viewDataState;
  }
  const minVal = {};
  const maxVal = {};
  const minTimeVal = {};
  const maxTimeVal = {};
  // loop on EP names
  const epNames = Object.keys(viewDataState.indexes);
  epNames.forEach((epName) => {
    // get interval to evaluate the min and max validity
    const lower = _head(viewDataState.indexes[epName]);
    const upper = _last(viewDataState.indexes[epName]);
    // Check validity of current extrema
    if (viewDataState.minTime[epName] >= lower && viewDataState.minTime[epName] <= upper
      && viewDataState.maxTime[epName] >= lower && viewDataState.maxTime[epName] <= upper) {
      // nothing to update
      return;
    }

    // Scan state values
    const timestamps = Object.keys(viewDataState.lines[epName]);
    for (let i = 0; i < timestamps.length; i += 1) {
      const point = viewDataState.lines[epName][timestamps[i]];
      if (!point.value) {
        return;
      }
      if (!minVal[epName] || minVal[epName] >= point.value) {
        minVal[epName] = point.value;
        minTimeVal[epName] = point.masterTime;
      }
      if (!maxVal[epName] || maxVal[epName] <= point.value) {
        maxVal[epName] = point.value;
        maxTimeVal[epName] = point.masterTime;
      }
    }
  });
  // Nothing to update
  if (!Object.keys(minVal).length && !Object.keys(maxVal).length) {
    return viewDataState;
  }
  return { ...viewDataState,
    min: Object.assign({}, viewDataState.min, minVal),
    max: Object.assign({}, viewDataState.max, maxVal),
    minTime: Object.assign({}, viewDataState.minTime, minTimeVal),
    maxTime: Object.assign({}, viewDataState.maxTime, maxTimeVal),
  };
}

export function removeViewDataByEp(viewData, epName, lower, upper) {
  if (lower > upper) {
    // unpredictable usage
    return { indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} };
  }
  // keep everything
  if (!viewData || !viewData.indexes || !viewData.indexes[epName]) {
    // state contains no data
    return viewData;
  }
  if (viewData.indexes[epName][0] >= lower && _last(viewData.indexes[epName]) <= upper) {
    // all points of entryPoint are in visuWindow
    return viewData;
  }
  // drop everything
  if (viewData.indexes[epName][0] > upper || _last(viewData.indexes[epName]) < lower) {
    return { ...viewData,
      indexes: _omit(viewData.indexes, epName),
      lines: _omit(viewData.lines, epName),
      min: _omit(viewData.min, epName),
      minTime: _omit(viewData.minTime, epName),
      max: _omit(viewData.max, epName),
      maxTime: _omit(viewData.maxTime, epName),
    };
  }
  // cut: keep min and max for PlotView drawing
  const iLower = _findIndex(viewData.indexes[epName], t => t >= lower);
  let iUpper = _findLastIndex(viewData.indexes[epName], t => t <= upper);
  iUpper = (iUpper === -1) ? viewData.indexes[epName].length - 1 : iUpper;
  const newIndexes = viewData.indexes[epName].slice(iLower, iUpper + 1);

  return { ...viewData,
    indexes: {
      ...viewData.indexes,
      [epName]: newIndexes,
    },
    lines: {
      ...viewData.lines,
      [epName]: _pick(viewData.lines[epName], newIndexes),
    },
  };
}
