import _ from 'lodash';
import { createSelector } from 'reselect';

/**
 * Selectors
 */
const getAllPages = state => state.pages; // TODO page selector

export function getWindow(state, windowId) {
  return state.windows[windowId];
}

export function getPages(state, windowId) {
  if (!windowId || !_.get(state, `windows.${windowId}.pages`)) { // TODO TEST
    return [];
  }

  return _.reduce(state.windows[windowId].pages, (pages, id) => {
    const page = state.pages[id];
    if (!page) {
      return pages;
    }

    return [...pages, Object.assign({ pageId: id }, page)];
  }, []);
}

export const getWindowFocusedPageId =
  (state, { windowId }) => _.get(state, ['windows', windowId, 'focusedPage']);

export const makeGetWindowFocusedPage = () => createSelector([
  getAllPages,
  getWindowFocusedPageId,
], (pages, pageId) => {
  return _.get(pages, pageId);
});
