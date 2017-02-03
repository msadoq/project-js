import _ from 'lodash/fp';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import _filter from 'lodash/filter';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { getFocusedWindowId } from './hsc';
import { getPages } from './pages';
// import { getViews } from './views';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

export const getViews =
  _.prop('views');

export const getWindows = state => _get(state, ['windows'], {});
export const getWindowsArray = createSelector(
  getWindows,
  windows =>
    Object
      .keys(windows)
      .map(id => ({
        id,
        ...windows[id]
      }))
);

export const getFocusedWindow = createSelector(
  getWindows,
  getFocusedWindowId,
  _get,
);

export const getWindow = (state, windowId) =>
  _get(getWindows(state), [windowId]);

export const getWindowPageIds = (state, windowId) =>
  _get(getWindow(state, windowId), ['pages']);

export const getWindowPages = createSelector(
  (state, windowId) => getWindowPageIds(state, windowId),
  state => state.pages,
  (ids = [], pages) => ids.map(id => ({ ...pages[id], pageId: id }))
);

export const getWindowFocusedPageId = (state, windowId) =>
  _get(getWindow(state, windowId), ['focusedPage']);

export const getWindowFocusedPageSelector = createSelector(
  getPages,
  getWindowFocusedPageId,
  (pages, pageId) => _get(pages, [pageId]));

// TODO deprecated
export const getWindowDebug = (state, { windowId }) =>
  _get(getWindow(state, windowId), ['debug']);

export const getWindowMinimized = (state, windowId) =>
  _get(getWindow(state, windowId), ['minimized']);

export const getWindowsFocusedPageIds = createSelector(
  getWindowsArray,
  windows =>
    windows
      .filter(w => w.focusedPage)
      .map(w => w.focusedPage)
);

export const getWindowsFocusedPage = createSelector(
  createDeepEqualSelector(getWindowsFocusedPageIds, _.identity),
  getPages,
  (pageIds, pages) =>
    pageIds
      .filter(id => id in pages)
      .map(id => pages[id])
);

export const getWindowsVisibleViewIds = createSelector(
  getWindowsFocusedPage,
  pages =>
    pages
      .filter(p => p.views && p.views.length && p.timebarUuid)
      .map(p => ({
        timebarUuid: p.timebarUuid,
        viewIds: p.views
      }))
);

export const getWindowsVisibleViews = createSelector(
  getWindowsVisibleViewIds,
  getViews,
  (viewIds, views) => {
    console.log('selector getWindowsVisibleViews');
    return viewIds
      .map(p => p.viewIds.map(vId => ({
        timebarUuid: p.timebarUuid,
        viewId: vId
      })))
      .reduce((acc, ids) => acc.concat(ids), [])
      .filter(v => !!views[v.viewId])
      .map(v => ({
        ...v,
        viewData: views[v.viewId]
      }));
  }
);

export const getWindowsTitle = createSelector(
  getWindows,
  windows => _reduce(
    windows,
    (titles, window, windowId) => Object.assign(titles, {
      [windowId]: `${window.title}${(window.isModified === true) ? ' *' : ''} - VIMA`
    }), {})
);

export function getModifiedWindowsIds(state) {
  return _filter(Object.keys(getWindows(state)), wId => state.windows[wId].isModified);
}

export function getExplorerTabName(state, windowId) {
  return _get(state, ['windows', windowId, 'tabName']);
}
