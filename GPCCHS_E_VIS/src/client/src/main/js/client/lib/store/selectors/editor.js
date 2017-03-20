import { getView } from './views';

const getEditorTitle = (state, viewId) => {
  if (!viewId) {
    return '';
  }

  const props = { viewId };
  const view = getView(state, props);
  if (!view || !view.configuration) {
    return '';
  }

  return `TextView HTML editor - ${view.title}`;
};

export default {
  getEditorTitle,
};
