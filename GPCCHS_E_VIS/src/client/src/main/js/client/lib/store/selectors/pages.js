import _get from 'lodash/get';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import __ from 'lodash/fp';
import { createSelector } from 'reselect';
// import { getViewsIdsCollapsed } from './views';

export const getPages = state => state.pages;
export const getPage = (state, { pageId }) => state.pages[pageId] && {
  ...state.pages[pageId], pageId,
};

export const getPanels = (state, { pageId }) => _get(getPage(state, { pageId }), 'panels');

export const getPageIds = createSelector(
  getPages,
  __.keys
);

export const getPageViewsIds = (state, { pageId }) =>
  _get(state, ['pages', pageId, 'views']);

export const getPageLayout =
  (state, { pageId }) => _get(state, ['pages', pageId, 'layout']);

export function getEditor(state, { pageId }) {
  return _get(state, `pages.${pageId}.editor`);
}

export function makeGetViews() {
  return createSelector(
    getPageViewsIds,
    state => state.views,
    (ids, views) => _map(ids, id => Object.assign({}, views[id], { viewId: id }))
  );
}

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

export function getModifiedPagesIds(state) {
  return _filter(Object.keys(getPages(state)), pId => state.pages[pId].isModified);
}

export function getPageModifiedViewsIds(state, { pageId }) {
  return _filter(getPageViewsIds(state, { pageId }), vId => state.views[vId].isModified);
}

export const getPageIdByViewId = (state, { viewId }) =>
  Object.keys(getPages(state))
    .map(k => ({ k, viewIds: getPageViewsIds(state, { pageId: k }) }))
    .filter(p => p.viewIds.filter(id => id === viewId).length)
    .map(p => p.k)[0];
