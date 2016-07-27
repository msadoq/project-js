export const ADD_VIEW = 'ADD_VIEW';
export const DEL_VIEW = 'DEL_VIEW';

export function addView(viewId) {
  return {
    type: ADD_VIEW,
    viewId,
  };
}
export function delView(viewId) {
  return {
    type: DEL_VIEW,
    viewId,
  };
}
