import _difference from 'lodash/difference';
import _each from 'lodash/each';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import { getStructureModule } from '../viewManager';

export default function cleanViewData(
  viewDataState,
  oldViewMap,
  viewMap,
  oldIntervals,
  newIntervals) {
  // Check if viewMap has changed
  if (_isEqual(viewMap, oldViewMap) && _isEqual(oldIntervals, newIntervals)) {
    return viewDataState;
  }
  let newState = viewDataState;
  // unmounted views
  const removedViews = _difference(Object.keys(oldViewMap), Object.keys(viewMap));
  if (removedViews.length) {
    // newState = u(u.omit(removedViews), viewDataState);
    newState = _omit(viewDataState, removedViews);
  }

  // check missing or updated entry points
  _each(viewMap, (view, id) => {
    const previousView = oldViewMap[id];
    if (!previousView) {
      return;
    }
    const structureType = getStructureModule(view.type);
    _each(previousView.entryPoints, (ep, epName) => {
      // check if only label has changed
      if (!view.entryPoints[epName]) {
        let newLabel;
        _find(view.entryPoints, (entryPoint, label) => {
          if (entryPoint.id === ep.id) {
            newLabel = label;
            return true;
          }
          return false;
        });
        if (newLabel) {
          // Update label in viewData
          newState = structureType.updateEpLabel(
            newState || viewDataState,
            id,
            epName,
            newLabel
          );
          return;
        }
      }
      // removed entry point if missing or invalid
      if (!view.entryPoints[epName] || ep.error) {
        newState = structureType.removeEpData(
          newState || viewDataState,
          id,
          epName
        );
        return;
      }
      const newEp = view.entryPoints[epName];
      const isUpdated = structureType.isEpDifferent(ep, newEp);
      // EP definition modified: remove entry point from viewData
      if (isUpdated) {
        newState = structureType.removeEpData(
          newState || viewDataState,
          id,
          epName
        );
        return;
      }
      // update on expected interval
      const oldInterval = _get(oldIntervals, [ep.remoteId, ep.localId, 'expectedInterval']);
      const newInterval = _get(newIntervals, [ep.remoteId, ep.localId, 'expectedInterval']);
      if (
        !oldInterval ||
        !newInterval ||
        oldInterval[0] !== newInterval[0] ||
        oldInterval[1] !== newInterval[1]
      ) {
        newState = structureType.cleanData(
          newState || viewDataState,
          id,
          epName,
          _map(newInterval, bound => bound + newEp.offset)
        );
      }
    });
  });

  return newState;
}
