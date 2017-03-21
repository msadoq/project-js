import _ from 'lodash/fp';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import _filter from 'lodash/filter';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

import { getFocusedWindowId } from '../reducers/hsc';
import { getViews } from '../reducers/views';
import { getPages } from '../reducers/pages';
import {
  getWindows,
  getWindowsArray,
  getWindowPageIds,
  getWindowFocusedPageId,
} from '../reducers/windows';

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
  (pageIds, pages) =>
    pageIds
      .filter(id => id in pages)
      .map(id => pages[id])
);

const getWindowsVisibleViewIds = createSelector(
  getWindowsFocusedPage,
  pages =>
    pages
      .filter(p => p.views && p.views.length && p.timebarUuid)
      .map(p => ({
        timebarUuid: p.timebarUuid,
        viewIds: p.views,
      }))
);

// specific to dataManager
export const getWindowsVisibleViews = createSelector(
  getWindowsVisibleViewIds,
  getViews,
  (viewIds, views) =>
    viewIds
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
/* -------------------------------------------------------------------------- */

// specific to windowsManager/windows
export const getWindowsTitle = createSelector(
  getWindows,
  windows => _reduce(
    windows,
    (titles, window, windowId) => Object.assign(titles, {
      [windowId]: `${window.title}${(window.isModified === true) ? ' *' : ''} - VIMA`,
    }), {})
);

// specific to menuManaer/workspaceSave
export function getModifiedWindowsIds(state) {
  return _filter(Object.keys(getWindows(state)), wId => state.windows[wId].isModified);
}
