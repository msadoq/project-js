import _get from 'lodash/get';
import { getView } from './views';

export const getViewId = state => _get(state, ['editor', 'textViewId'], {});
export const getViewTitle = (state, viewId) => {
  if (!viewId) {
    return '';
  }
  const view = getView(state, viewId);
  return `TextView HTML editor - ${view.configuration.title}`;
};
