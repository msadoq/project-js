import _get from 'lodash/get';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import { createSelector } from 'reselect';

export const getPages = state => state.pages;
export const getPage = (state, pageId) => state.pages[pageId];

export const getPageViewsIds = (state, { pageId }) =>
  _get(state, ['pages', pageId, 'views']);

export const getPageLayout =
  (state, { pageId }) => _get(state, ['pages', pageId, 'layout']);

export function getEditor(state, pageId) { // TODO : test
  return _get(state, `pages.${pageId}.editor`);
}

export function makeGetViews() { // TODO : test
  return createSelector(
    [
      getPageViewsIds,
      state => state.views,
    ],
    (ids, views) => _map(ids, id => Object.assign({}, views[id], { viewId: id }))
  );
}

export function makeGetLayouts() { // TODO : test
  return createSelector(
    [getPageLayout],
    layout => ({
      lg: _map(layout, e => Object.assign({
        minW: 3,
        minH: 3
      }, e)),
    })
  );
}

export function getModifiedPagesIds(state) {
  return _filter(Object.keys(state.pages), pId => state.pages[pId].isModified);
}

export function getPageModifiedViewsIds(state, pageId) {
  return _filter(state.pages[pageId].views, vId => state.views[vId].isModified);
}
