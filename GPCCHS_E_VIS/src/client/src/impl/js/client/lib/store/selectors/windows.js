import _get from 'lodash/get';
import { createSelector } from 'reselect';

/**
 * Selectors
 */
const getAllPages = state => state.pages; // TODO page selector

export const getWindow = (state, windowId) => state.windows[windowId];

export function getPages(state, windowId) {
  if (!windowId) { // TODO TEST
    return [];
  }

  const pages = _get(state, `windows.${windowId}.pages`, []);

  return pages.reduce((pages, id) => {
    const page = state.pages[id];
    if (!page) {
      return pages;
    }

    return [...pages, { pageId: id, ...page }];
  }, []);
}

export const getWindowFocusedPageId =
  (state, { windowId }) => _get(state, ['windows', windowId, 'focusedPage']);

export const getWindowFocusedPageSelector = createSelector([
  getAllPages,
  getWindowFocusedPageId,
], (pages, pageId) => pages[pageId]);
