// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure +
//  cleaning
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Fix or comment some coding standard warnings
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to
//  limit visuWindow per view
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update DynamicView : plug it to data consumption
// END-HISTORY
// ====================================================================

import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import _omit from 'lodash/omit';

// eslint-disable-next-line complexity, "DV6 TBC_CNES Unavoidable complexity"
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
  if (!oldViewDef || !currentViewState || !currentViewState.index) {
    return currentViewState;
  }
  // invisible view
  if (!newViewDef) {
    return {};
  }
  const epNames = Object.keys(oldViewDef.entryPoints || {});
  if (!epNames.length) {
    return currentViewState;
  }
  const epName = epNames[0];
  const ep = oldViewDef.entryPoints[epName];
  // removed entry point if missing or invalid
  if (!newViewDef.entryPoints[epName] || ep.error) {
    return {};
  }
  const newEp = newViewDef.entryPoints[epName];
  // EP definition modified: remove entry point from viewData
  if (ep.tbdId !== newEp.tbdId) {
    return {};
  }
  // update on expected interval
  const oldInterval = _get(oldIntervals, [ep.tbdId, ep.localId, 'expectedInterval']);
  const newInterval = _get(newIntervals, [ep.tbdId, ep.localId, 'expectedInterval']);
  if (!newInterval) {
    return { ...currentViewState,
      index: _omit(currentViewState.index, epName),
      value: _omit(currentViewState.values, epName),
    };
  } else if (oldInterval &&
    (oldInterval[0] !== newInterval[0] || oldInterval[1] !== newInterval[1])) {
    const lower = newInterval[0] + newEp.offset;
    const upper = newInterval[1] + newEp.offset;
    const currentTime = currentViewState.index;
    if (!currentTime || (currentTime >= lower && currentTime <= upper)) {
      return currentViewState;
    }
    return {};
  }
  return currentViewState;
}
