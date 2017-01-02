import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import { createSelector } from 'reselect';
import { getPages } from './pages';
import { getViews } from './views';

export const getWindows = state => _get(state, ['windows'], {});
export const getWindowsArray = createSelector(
  getWindows,
  windows => Object
    .keys(windows)
    .map(id => ({
      id,
      ...windows[id]
    }))
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
  windows => windows
    .filter(w => w.focusedPage)
    .map(w => w.focusedPage)
);

export const getWindowsFocusedPage = createSelector(
  getWindowsFocusedPageIds,
  getPages,
  (pageIds, pages) =>
    pageIds
      .filter(id => id in pages)
      .map(id => pages[id]));

export const getWindowsVisibleViewIds = createSelector(
  getWindowsFocusedPage,
  pages =>
    pages
      .filter(p => p.views)
      .filter(p => p.views.length)
      .filter(p => p.timebarId)
      .map(p => ({
        timebarId: p.timebarId,
        viewIds: p.views
      })));

export const getWindowsVisibleViews = createSelector(
  getWindowsVisibleViewIds,
  getViews,
  (pages, views) => _reduce(pages, (list, { timebarId, viewIds }) =>
    _reduce(viewIds, (l, viewId) => {
      if (!views[viewId]) {
        return l;
      }

      return l.concat({ viewId, timebarId, viewData: views[viewId] });
    }, list),
  [])
);
//   getWindowsVisibleViewIds,
//   getViews,
//   (pages, views) =>
//     pages.reduce((acc, page) =>
//       acc.concat(Object.keys(views)
//         .filter(vId => page.viewIds.indexOf(Number(vId)) >= 0)
//         .map(vId => ({
//           viewId: Number(vId),
//           timebarId: page.timebarId,
//           viewData: views[vId],
//         })))
//     , [])
// );
