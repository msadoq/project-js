import _get from 'lodash/get';
import { getView } from './views';

export const getViewId = state => _get(state, ['editor', 'textViewId'], {});

// TODO abesson : getViewTitle has nothing to do in this file (selectors/views.js)
export const getViewTitle = (state, viewId) => {
  if (!viewId) {
    return '';
  }
  const props = { viewId };
  const view = getView(state, props);
  return `TextView HTML editor - ${view.configuration.title}`;
};
