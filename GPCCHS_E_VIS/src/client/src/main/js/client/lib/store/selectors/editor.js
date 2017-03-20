import _get from 'lodash/get';
import { getView } from './views';

// simple
export const getViewId = state => _get(state, ['editor', 'textViewId'], {});

// derived
export const getEditorTitle = (state, viewId) => {
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
