// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// VERSION : 2.0.0 : DM : #6127 : 20/09/2017 : Update of history view data store
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

/* eslint-disable no-restricted-syntax,no-continue,no-unused-vars */
import _ from 'lodash/fp';
import _difference from 'lodash/difference';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import { mapTabularData, removeTabularData } from '../../commonData/reducer';


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
  let updatedState = currentState;
  // invisible view
  if (!newViewFromMap) {
    return {};
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
        updatedState = updateEpLabel(updatedState, epName, newLabel);
        continue;
      }
    }
    // removed entry point if invalid
    // EP definition modified: remove entry point from viewData
    if (isInvalidEntryPoint(oldEp, newEp)) {
      updatedState = removeEpData(updatedState, epName);
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
      updatedState = removeEpData(updatedState, epName);
    } else if (oldInterval &&
      (oldInterval[0] !== newInterval[0] || oldInterval[1] !== newInterval[1])) {
      const lower = newInterval[0] + newEp.offset;
      const upper = newInterval[1] + newEp.offset;
      updatedState = removeViewDataOutsideRange(updatedState, lower, upper);
    }
  }

  return updatedState;
}

function removeEpData(state, epName) {
  if (epName && epName.length > 0) {
    return removeTabularData(state, 'history', e => e.epName === epName);
  }

  return state;
}

function isInvalidEntryPoint(oldEp, newEp) {
  return (!newEp || (newEp.error && newEp.error !== oldEp.error)
    || oldEp.field !== newEp.field  // TODO check if this comparison is ok
    || oldEp.tbdId !== newEp.tbdId);
}


export function updateEpLabel(viewData, oldLabel, newLabel) { // TODO: update this in middleware
  if (!oldLabel || !newLabel || oldLabel === newLabel) {
    return viewData;
  }

  return mapTabularData(viewData, 'history', (el) => {
    if (el.epName === oldLabel) { // check field
      return {
        ...el,
        epName: newLabel,
      };
    }

    return el;
  });
}

export function removeViewDataOutsideRange(viewData, lower, upper) {
  return removeTabularData(viewData, 'history', (e) => {
    if (!e) {
      return true;
    }

    const time = (new Date(e.referenceTimestamp)).getTime();
    return (time < lower) || (time > upper);
  });
}
