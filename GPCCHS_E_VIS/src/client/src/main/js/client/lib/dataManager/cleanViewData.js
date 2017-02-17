import _difference from 'lodash/difference';
import _each from 'lodash/each';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';
import u from 'updeep';

import { getStructureModule } from '../viewManager';

export default function cleanViewData(viewDataState, oldViewMap, viewMap) {
  // Check if viewMap has changed
  if (_isEqual(viewMap, oldViewMap)) {
    return viewDataState;
  }

  let newState;
  // unmounted views
  const removedViews = _difference(Object.keys(oldViewMap), Object.keys(viewMap));
  if (removedViews.length) {
    newState = u(u.omit(removedViews), viewDataState);
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
      // no update on entry points
      if (ep === newEp) {
        return;
      }

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
      if (ep.expectedInterval[0] !== newEp.expectedInterval[0]
       || ep.expectedInterval[1] !== newEp.expectedInterval[1]) {
        newState = structureType.cleanData(
          newState || viewDataState,
          id,
          epName,
          _map(newEp.expectedInterval, bound => bound + newEp.offset)
        );
      }
    });
  });

  return newState;
}
