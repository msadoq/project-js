import _map from 'lodash/map';
import _filter from 'lodash/filter';
import { createSelector } from 'reselect';

import { getPageViewsIds, getPageLayout } from '../reducers/pages';

// specific to Page/ContentContainer
export function makeGetViews() {
  return createSelector(
    getPageViewsIds,
    state => state.views, // because get views here
    (ids, views) => _map(ids, id => Object.assign({}, views[id], { viewId: id }))
  );
}

// specific to Page/ContentContainer
export function makeGetLayouts() {
  return createSelector(
    getPageLayout,
    layout => ({
      lg: _map(layout, (e) => {
        if (e.collapsed) {
          return (
          Object.assign({
            minW: 3,
            minH: 1,
          }, e, { w: 3, h: 1 }));
        }
        return (
        Object.assign({
          minW: 3,
          minH: 3,
        }, e));
      }),
    })
  );
}


// specific (menuManager/pageSave)
export function getPageModifiedViewsIds(state, { pageId }) {
  return _filter(getPageViewsIds(state, { pageId }), vId => state.views[vId].isModified);
}
