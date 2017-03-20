import __ from 'lodash/fp';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import _filter from 'lodash/filter';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { getFocusedWindowId } from './hsc';
import { getPages } from './pages';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  __.isEqual
);

// simple (views reducer)
export const getViews =
  __.prop('views');

// simple
export const getWindows = state => _get(state, ['windows'], {});

// derived (TODEL because have uuid)
export const getWindowsArray = createSelector(
  getWindows,
  windows =>
    Object
      .keys(windows)
      .map(id => ({
        id,
        ...windows[id],
      }))
);

// derived
export const getFocusedWindow = createSelector(
  getWindows,
  getFocusedWindowId,
  _get
);

// simple
export const getWindow = createSelector(
  (state, { windowId }) => windowId,
  getWindows,
  __.get
);

// simple
export const getWindowPageIds = createSelector(
  getWindow,
  __.get('pages')
);

// derived
export const getWindowPages = createSelector(
  getWindowPageIds,
  __.get('pages'),
  (ids = [], pages) => ids.map(id => ({ ...pages[id], pageId: id }))
);

// simple
export const getWindowFocusedPageId = createSelector(
  getWindow,
  __.get('focusedPage')
);

// derived
export const getWindowFocusedPageSelector = createSelector(
  getWindowFocusedPageId,
  getPages,
  __.get
);

// simple
export const getWindowMinimized = createSelector(
  getWindow,
  __.get('minimized')
);

// simple
export const getWindowsFocusedPageIds = createSelector(
  getWindowsArray,
  windows =>
    windows
      .filter(w => w.isLoaded === true && w.focusedPage)
      .map(w => w.focusedPage)
);

// derived
export const getWindowsFocusedPage = createSelector(
  createDeepEqualSelector(getWindowsFocusedPageIds, __.identity),
  getPages,
  (pageIds, pages) =>
    pageIds
      .filter(id => id in pages)
      .map(id => pages[id])
);

// derived
export const getWindowsVisibleViewIds = createSelector(
  getWindowsFocusedPage,
  pages =>
    pages
      .filter(p => p.views && p.views.length && p.timebarUuid)
      .map(p => ({
        timebarUuid: p.timebarUuid,
        viewIds: p.views,
      }))
);

// derived
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

// derived
export const getWindowsTitle = createSelector(
  getWindows,
  windows => _reduce(
    windows,
    (titles, window, windowId) => Object.assign(titles, {
      [windowId]: `${window.title}${(window.isModified === true) ? ' *' : ''} - VIMA`,
    }), {})
);

// simple
export function getModifiedWindowsIds(state) {
  return _filter(Object.keys(getWindows(state)), wId => state.windows[wId].isModified);
}

// simple
export function getDisplayHelp(state, { windowId }) {
  return _get(state, ['windows', windowId, 'displayHelp']);
}

// TODEL
export function getIsLoaded(state, { windowId }) {
  return _get(state, ['windows', windowId, 'isLoaded']);
}
