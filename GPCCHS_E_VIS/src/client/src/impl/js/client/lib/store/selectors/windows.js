import _get from 'lodash/get';
import { createSelector } from 'reselect';

/**
 * Selectors
 */
const getAllPages = state => state.pages; // TODO page selector

export function getWindow(state, windowId) {
  return state.windows[windowId];
}

export function getPages(state, windowId) {
  const pages = _get(state, `windows.${windowId}.pages`, []);
  if (!windowId) { // TODO TEST
    return [];
  }

  return pages.map((id) => {
    const page = state.pages[id] || {};
    return {
      pageId: id,
      ...page
    }
  });
}

export const getWindowFocusedPageId =
  (state, { windowId }) => _get(state, ['windows', windowId, 'focusedPage']);

export const makeGetWindowFocusedPage = () => createSelector([
  getAllPages,
  getWindowFocusedPageId,
], (pages, pageId) => pages[pageId]);
