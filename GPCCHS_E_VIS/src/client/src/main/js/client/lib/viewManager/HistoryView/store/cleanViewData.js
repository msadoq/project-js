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
import _omit from 'lodash/omit';

import { updateFilteredIndexes } from './dataReducer';

/**
 * Keeps only indexes that correspond to actual data
 *
 * @param state
 * @param type
 * @returns {void|*}
 * @private
 */
const _scopeIndexesByType = (state, type) => {
  const updatedIndexes = _.get(['indexes', type], state);

  const _shouldKeepIndex =
    index => _.has(['data', ...index.split(' ')], state);

  return _.set(
    ['indexes', type],
    _.filter(_shouldKeepIndex, updatedIndexes),
    state
  );
};

/**
 * Keeps only indexes that corresponds to data inside visualization window
 *
 * @param state
 * @param type
 * @param lower
 * @param upper
 * @returns {void|*}
 * @private
 */
const _scopeIndexesByVisualizationWindow = (state, type, lower, upper) => {
  const updatedIndexes = _.get(['indexes', type], state);

  const _shouldKeepIndex =
    (index) => {
      const timestamp = index.split(' ')[1];
      const time = Number(timestamp);

      return (time >= lower) && (time <= upper);
    };

  return _.set(
    ['indexes', type],
    _.filter(_shouldKeepIndex, updatedIndexes),
    state
  );
};

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
      data: {},
      indexes: {
        referenceTimestamp: [],
      },
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
      newState = removeEpData(newState, epName);
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
      newState = removeEpData(newState, epName);
    } else if (oldInterval &&
      (oldInterval[0] !== newInterval[0] || oldInterval[1] !== newInterval[1])) {
      const lower = newInterval[0] + newEp.offset;
      const upper = newInterval[1] + newEp.offset;
      newState = removeViewDataByEp(newState, epName, lower, upper);

// eslint-disable-next-line no-loop-func
      Object.keys(newState.indexes).forEach((key) => {
        // removes indexes outside current visualization window
        newState = _scopeIndexesByVisualizationWindow(newState, key, lower, upper);
      });
    }
  }

  Object.keys(newState.indexes).forEach((key) => {
    if (key !== 'keep') {
      // keeps only indexes that correspond to actual ep data
      newState = _scopeIndexesByType(newState, key);
    }
  });

  newState = updateFilteredIndexes(newState, historyConfig.tables.history.filters);

  return newState;
}

function removeEpData(state, epName) {
  if (epName && epName.length > 0) {
    return _.omit(['data', epName], state);
  }

  return state;
}

function isInvalidEntryPoint(oldEp, newEp) {
  return (!newEp || (newEp.error && newEp.error !== oldEp.error)
    || oldEp.field !== newEp.field  // TODO check if this comparison is ok
    || oldEp.tbdId !== newEp.tbdId);
}


export function updateEpLabel(viewData, oldLabel, newLabel) {
  if (!oldLabel || !newLabel || oldLabel === newLabel) {
    return viewData;
  }
  // unknown label
  if (!viewData.data || !viewData.data[oldLabel]) {
    return viewData;
  }
  const newState = _omit(viewData, ['data', oldLabel]);
  if (!newState.data) {
    newState.data = {};
  }
  newState.data[newLabel] = viewData.data[oldLabel];

  if (!newState.indexes) {
    newState.indexes = {
      referenceTimestamp: [],
    };
  }

  return newState;
}

export function removeViewDataByEp(viewData, epName, lower, upper) {
  let epData = _.getOr({}, ['data', epName], viewData);
  epData = Object.keys(epData).reduce((acc, timestamp) => {
    const time = Number(timestamp);
    if ((time >= lower) && (time <= upper)) {
      return {
        ...acc,
        [time]: epData[time],
      };
    }
    return acc;
  }, {});

  return _.set(['data', epName], epData, viewData);
}
