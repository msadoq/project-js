import _reduce from 'lodash/reduce';
import _each from 'lodash/each';
import _map from 'lodash/map';
import _find from 'lodash/find';
import u from 'updeep';

import structures from './structures';
import vivl from '../../VIVL/main';
import debug from '../common/debug/mainDebug';

const logger = debug('dataManager:cleanViewData');


// viewMap =
// { viewId:
//  { type: 'TextView || PlotView',
//    structureType: 'last || range',
//    entryPoints:
//     { epName: [Object],
//       epName: [Object], } },}

export default function cleanViewData(state, oldViewMap, viewMap) {
  let newState;
  // unmounted views
  const missingViewId = _reduce(oldViewMap, (list, view, viewId) => {
    if (!viewMap[viewId]) {
      list.push(viewId);
    }
    return list;
  }, []);
  // remove view id from viewData
  missingViewId.forEach((id) => {
    newState = u({ viewData: u.omit(id) }, newState || state);
  });
  // check missing or updated entry points
  _each(viewMap, (view, id) => {
    const structureType = vivl(view.type, 'structureType')();
    const previousView = oldViewMap[id];
    if (!previousView) {
      return;
    }

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
          try {
            newState = structures(structureType, 'updateEpLabel')(newState || state,
                        id, epName, newLabel);
          } catch (e) {
            logger.warn(`No updateEpLabel for ${structureType} view`);
          }
          return;
        }
      }
      // removed entry point if missing or invalid
      if (!view.entryPoints[epName] || ep.error) {
        try {
          newState = structures(structureType, 'removeEpData')(newState || state, id, epName);
        } catch (e) {
          logger.warn(`No removeEpData for ${structureType} view`);
        }
        return;
      }

      const newEp = view.entryPoints[epName];
      // no update on entry points
      if (ep === newEp) {
        return;
      }

      const isUpdated = structures(structureType, 'isEpDifferent')(ep, newEp);
      // EP definition modified: remove entry point from viewData
      if (isUpdated) {
        try {
          newState = structures(structureType, 'removeEpData')(newState || state, id, epName);
        } catch (e) {
          logger.warn(`No removeEpData for ${structureType} view`);
        }
        return;
      }
      // update on expected interval
      if (ep.expectedInterval[0] !== newEp.expectedInterval[0]
       || ep.expectedInterval[1] !== newEp.expectedInterval[1]) {
        try {
          newState = structures(structureType, 'cleanData')(newState || state, id, epName,
                                _map(newEp.expectedInterval, bound => bound + newEp.offset));
        } catch (e) {
          logger.warn(`No cleanData for ${structureType} view`);
        }
      }
    });
  });

  return newState;
}
