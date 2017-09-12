import _ from 'lodash/fp';
import _get from 'lodash/get';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

import { getFocusedWindowId } from '../reducers/hsc';
import { getPages, getPageIdByViewId } from '../reducers/pages';
import {
  getWindows,
  getWindowPageIds,
  getWindowFocusedPageId,
  getWindowsArray,
  getWindowIdByPageId,
} from '../reducers/windows';
import { getViews } from '../reducers/views';


export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

// composed
export const getFocusedWindow = createSelector(
  getWindows,
  getFocusedWindowId,
  _get
);

// composed
export const getWindowPages = createSelector(
  getWindowPageIds,
  getPages,
  (ids = [], pages) => ids.map(id => ({ ...pages[id], pageId: id }))
);

// composed
export const getWindowFocusedPageSelector = createSelector(
  getWindowFocusedPageId,
  getPages,
  _.get
);

export const getWindowByPageId = createSelector(
  getWindows,
  (state, { pageId }) => pageId,
  (windows, pageId) => _.find(
    _.compose(_.find(_.equals(pageId)), _.get('pages')),
    windows
  )
);

/* -------------------------------------------------------------------------- */
const getWindowsFocusedPageIds = createSelector(
  getWindowsArray,
  windows =>
    windows
      .filter(w => w.isLoaded === true && w.focusedPage)
      .map(w => w.focusedPage)
);

const getWindowsFocusedPage = createSelector(
  createDeepEqualSelector(getWindowsFocusedPageIds, _.identity),
  getPages,
  (pageIds, pages) => pageIds.filter(id => id in pages).map(id => pages[id])
);

const getWindowsVisibleViewIds = createSelector(
  getWindowsFocusedPage,
  pages => pages
      .filter(p => p.views && p.views.length && p.timebarUuid)
      .map(p => ({
        timebarUuid: p.timebarUuid,
        viewIds: p.views,
      }))
);

export const getWindowsVisibleViews = createSelector(
  getWindowsVisibleViewIds,
  getViews,
  (viewIds, views) => viewIds
      .map(p => p.viewIds.map(vId => ({
        timebarUuid: p.timebarUuid,
        viewId: vId,
      })))
      .reduce((acc, ids) => acc.concat(ids), [])
      .filter(v => !!views[v.viewId])
      .map(v => ({
        ...v,
        viewData: views[v.viewId],
      }))
);

export const getWindowIdByViewId = (state, { viewId }) => {
  const pageId = getPageIdByViewId(state, { viewId });
  return getWindowIdByPageId(state, { pageId });
};
/* -------------------------------------------------------------------------- */
