import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import { createSelector } from 'reselect';
import { getPages } from './pages';
import { getViews } from './views';

export const getWindows = state => state.windows;

// TODO test
export const getWindowPageIds = (state, windowId) =>
  _get(state, ['windows', windowId, 'pages']);

export const getWindow = (state, windowId) => state.windows[windowId];

export const getWindowPages = createSelector(   // TODO test
  [
    (state, windowId) => getWindowPageIds(state, windowId),
    state => state.pages,
  ],
  (ids = [], pages) => ids.map(id => ({ ...pages[id], pageId: id }))
);

// TODO test
export const getWindowFocusedPageId =
  (state, windowId) => _get(state, ['windows', windowId, 'focusedPage']);

// TODO test
export const getWindowFocusedPageSelector = createSelector([
  getPages,
  (state, windowId) => getWindowFocusedPageId(state, windowId),
], (pages, pageId) => pages[pageId]);

// TODO test
export const getWindowDebug = (state, { windowId }) => _get(state, ['windows', windowId, 'debug']);

export const getWindowsFocusedPageIds = createSelector(
  [getWindows],
  windows => _reduce(windows, (list, w) => {
    if (!w.focusedPage) {
      return list;
    }

    return list.concat(w.focusedPage);
  }, [])
);

export const getWindowsFocusedPage = createSelector(
  [getWindowsFocusedPageIds, getPages],
  (pageIds, pages) => _reduce(pageIds, (list, pageId) => {
    if (!pages[pageId]) {
      return list;
    }

    return list.concat(pages[pageId]);
  }, [])
);

export const getWindowsVisibleViewIds = createSelector(
  [getWindowsFocusedPage],
  pages => _reduce(pages, (list, page) => {
    if (!page.views || !page.views.length) {
      return list;
    }
    if (!page.timebarId) {
      return list;
    }

    return list.concat({ timebarId: page.timebarId, viewIds: page.views });
  }, [])
);

export const getWindowsVisibleViews = createSelector(
  [getWindowsVisibleViewIds, getViews],
  (pages, views) => _reduce(pages, (list, { timebarId, viewIds }) =>
    _reduce(viewIds, (l, viewId) => {
      if (!views[viewId]) {
        return l;
      }

      return l.concat({ viewId, timebarId, viewData: views[viewId] });
    }, list),
  [])
);
