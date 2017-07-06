/* eslint-disable no-continue */
/* eslint-disable complexity, "DV6 TBC_CNES clean current view data need hight complexity" */
import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import _omit from 'lodash/omit';

/** ************************************************
 * Clean viewData for current viewData
 * @param currentState view data State
 * @param oldViewFromMap current view definition
 * @param newViewFromMap current view definition
 * @param oldIntervals expected intervals for all entry points
 * @param newIntervals expected intervals for all entry points
 * @return cleaned state for current view
/** ************************************************/
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
    if (ep.field !== newEp.field || ep.remoteId !== newEp.remoteId) {
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
    const oldInterval = _get(oldIntervals, [ep.remoteId, ep.localId, 'expectedInterval']);
    const newInterval = _get(newIntervals, [ep.remoteId, ep.localId, 'expectedInterval']);
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
