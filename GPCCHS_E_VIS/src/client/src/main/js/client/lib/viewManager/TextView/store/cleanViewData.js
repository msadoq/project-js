// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure + cleaning
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add some eslint relaxation rules
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// END-HISTORY
// ====================================================================

/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import _omit from 'lodash/omit';

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function cleanCurrentViewData(
  currentViewState,
  oldViewDef,
  newViewDef,
  oldIntervals,
  newIntervals) {
  if (!oldViewDef) {
    return currentViewState;
  }
  // Check if viewMap has changed
  if (_isEqual(newViewDef, oldViewDef) && _isEqual(oldIntervals, newIntervals)) {
    return currentViewState;
  }
  // new visible view
  if (!oldViewDef || !currentViewState || !Object.keys(currentViewState.index).length) {
    return currentViewState;
  }
  // invisible view
  if (!newViewDef) {
    return { index: {}, values: {} };
  }
  let viewData = currentViewState;
  const epNames = Object.keys(oldViewDef.entryPoints || {});
  for (let i = 0; i < epNames.length; i += 1) {
    const epName = epNames[i];
    const ep = oldViewDef.entryPoints[epName];
    // check if only label has changed
    if (!newViewDef.entryPoints[epName]) {
      let newLabel;
      _find(newViewDef.entryPoints, (entryPoint, label) => {
        if (entryPoint.id === ep.id) {
          newLabel = label;
          return true;
        }
        return false;
      });
      if (newLabel) {
        // Update label in viewData
        if (!epName || !newLabel || epName === newLabel || !viewData) {
          continue;
        }
        const oldIndex = viewData.index[epName];
        const oldValue = viewData.values[epName];

        // remove old label from state
        viewData = { ...viewData,
          index: _omit(viewData.index, epName),
          values: _omit(viewData.values, epName),
        };
        // add newLabel in state
        viewData = { ...viewData,
          index: { ...viewData.index, [newLabel]: oldIndex },
          values: { ...viewData.values, [newLabel]: oldValue },
        };
        continue;
      }
    }
    // removed entry point if missing or invalid
    if (!newViewDef.entryPoints[epName] || ep.error) {
      if (!viewData.index[epName]) {
        continue;
      }
      viewData = { ...viewData,
        index: _omit(viewData.index, epName),
        values: _omit(viewData.values, epName),
      };
      continue;
    }
    const newEp = newViewDef.entryPoints[epName];
    // EP definition modified: remove entry point from viewData
    if (ep.field !== newEp.field || ep.tbdId !== newEp.tbdId) {
      if (!viewData.index[epName]) {
        continue;
      }
      viewData = { ...viewData,
        index: _omit(viewData.index, epName),
        values: _omit(viewData.values, epName),
      };
      continue;
    }
    // update on expected interval
    const oldInterval = _get(oldIntervals, [ep.tbdId, ep.localId, 'expectedInterval']);
    const newInterval = _get(newIntervals, [ep.tbdId, ep.localId, 'expectedInterval']);
    if (!newInterval) {
      viewData = { ...viewData,
        index: _omit(viewData.index, epName),
        values: _omit(viewData.values, epName),
      };
    } else if (oldInterval &&
      (oldInterval[0] !== newInterval[0] || oldInterval[1] !== newInterval[1])) {
      const lower = newInterval[0] + newEp.offset;
      const upper = newInterval[1] + newEp.offset;
      const currentTime = viewData.index[epName];
      if (!currentTime || (currentTime >= lower && currentTime <= upper)) {
        continue;
      }
      viewData = { ...viewData,
        index: _omit(viewData.index, epName),
        values: _omit(viewData.values, epName),
      };
    }
  }
  return viewData;
}
