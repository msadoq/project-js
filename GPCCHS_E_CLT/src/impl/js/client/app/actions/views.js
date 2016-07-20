export const UPDATE_CONTENT = 'UPDATE_CONTENT';

export function updateContent(viewId, content) {
  return {
    type: UPDATE_CONTENT,
    viewId,
    content,
  };
}
