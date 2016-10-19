import _get from 'lodash/get';
import _map from 'lodash/map';
import { createSelector } from 'reselect';

/**
 * Selectors
 */
const getPages = state => state.pages;

export const getWindowPageIds = (state, { windowId }) =>
  _get(state, ['windows', windowId, 'pages']);

export const getWindow = (state, windowId) => state.windows[windowId];

export const getWindowPages = createSelector(
  [
    getWindowPageIds,
    state => state.pages,
  ],
  (ids, pages) => _map(ids, id => Object.assign({}, pages[id], { pageId: id }))
);

export const getWindowFocusedPageId =
  (state, { windowId }) => _get(state, ['windows', windowId, 'focusedPage']);

export const getWindowFocusedPageSelector = createSelector([
  getPages,
  getWindowFocusedPageId,
], (pages, pageId) => pages[pageId]);

export const getWindowDebug = (state, { windowId }) => _get(state, ['windows', windowId, 'debug']);

