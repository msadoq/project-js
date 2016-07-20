export const CHANGE_PAGE = 'CHANGE_PAGE';
export const ADD_WINDOW = 'ADD_WINDOW';
export const DEL_WINDOW = 'DEL_WINDOW';

export function changePage(pageId, windowId) {
  return {
    type: CHANGE_PAGE,
    pageId,
    windowId,
  };
}
export function addWindow(windowId, title) {
  return {
    type: ADD_WINDOW,
    windowId,
    title,
  };
}
export function delWindow(windowId) {
  return {
    type: DEL_WINDOW,
    windowId,
  };
}
