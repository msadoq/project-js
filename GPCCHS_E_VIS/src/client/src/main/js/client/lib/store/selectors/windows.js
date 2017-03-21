import _ from 'lodash/fp';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import _filter from 'lodash/filter';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { getFocusedWindowId } from '../reducers/hsc';
import { getPages } from '../reducers/pages';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

// simple (views reducer)
export const getViews =
  _.prop('views');

// simple
export const getWindows = state => _get(state, ['windows'], {});

// simple
export const getWindowsArray = createSelector(
  getWindows,
  _.values
);

// composed
export const getFocusedWindow = createSelector(
  getWindows,
  getFocusedWindowId,
  _get
);

// simple
export const getWindow = createSelector(
  (state, { windowId }) => windowId,
  getWindows,
  _.get
);

// simple
export const getWindowPageIds = createSelector(
  getWindow,
  _.get('pages')
);

// composed
export const getWindowPages = createSelector(
  getWindowPageIds,
  getPages,
  (ids = [], pages) => ids.map(id => ({ ...pages[id], pageId: id }))
);

// simple
export const getWindowFocusedPageId = createSelector(
  getWindow,
  _.get('focusedPage')
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

// composed specific to dataManager
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

// simple specific
export const getWindowsTitle = createSelector(
  getWindows,
  windows => _reduce(
    windows,
    (titles, window, windowId) => Object.assign(titles, {
      [windowId]: `${window.title}${(window.isModified === true) ? ' *' : ''} - VIMA`,
    }), {})
);

// simple specific
export function getModifiedWindowsIds(state) {
  return _filter(Object.keys(getWindows(state)), wId => state.windows[wId].isModified);
}

// simple
export function getDisplayHelp(state, { windowId }) {
  return _get(state, ['windows', windowId, 'displayHelp']);
}
