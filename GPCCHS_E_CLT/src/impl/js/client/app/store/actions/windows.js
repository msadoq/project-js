export const FOCUS_PAGE = 'FOCUS_PAGE';
export const ADD_WINDOW = 'ADD_WINDOW';
export const DEL_WINDOW = 'DEL_WINDOW';
export const MOUNT_PAGE = 'MOUNT_PAGE';
export const UNMOUNT_PAGE = 'UNMOUNT_PAGE';

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
export function focusPage(pageId, windowId) {
  return {
    type: FOCUS_PAGE,
    pageId,
    windowId,
  };
}
export function mountPage(pageId, windowId) {
  return {
    type: MOUNT_PAGE,
    pageId,
    windowId,
  };
}
export function unmountPage(pageId, windowId) {
  return {
    type: UNMOUNT_PAGE,
    pageId,
    windowId,
  };
}
