export const ADD_PAGE = 'ADD_PAGE';
export const DEL_PAGE = 'DEL_PAGE';
export const OPEN_EDITOR = 'OPEN_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_EDITOR';
export const MOUNT_VIEW = 'MOUNT_VIEW';
export const UNMOUNT_VIEW = 'UNMOUNT_VIEW';

export function addPage(pageId, title) {
  return {
    type: ADD_PAGE,
    pageId,
    title,
  };
}
export function delPage(pageId) {
  return {
    type: DEL_PAGE,
    pageId,
  };
}
export function openEditor(pageId, viewId) {
  return {
    type: OPEN_EDITOR,
    pageId,
    viewId,
  };
}
export function closeEditor(pageId) {
  return {
    type: CLOSE_EDITOR,
    pageId,
  };
}
export function mountView(viewId, pageId) {
  return {
    type: MOUNT_VIEW,
    viewId,
    pageId,
  };
}
export function unmountView(viewId, pageId) {
  return {
    type: UNMOUNT_VIEW,
    viewId,
    pageId,
  };
}
