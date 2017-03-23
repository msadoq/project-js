import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getWindows } from '../../store/reducers/windows';
import { getEditorTitle } from '../../store/reducers/editor';
import { getView } from '../../store/reducers/views';

export const getEditorWindowTitle = (state, { viewId }) => {
  if (!viewId) {
    return '';
  }

  const props = { viewId };
  const view = getView(state, props);
  if (!view || !view.configuration) {
    return '';
  }

  return `${getEditorTitle(state)} - ${view.title}`;
};

const formatWindowTitle = win => `${win.title}${(win.isModified === true) ? ' *' : ''} - VIMA`;
export const getWindowsTitle = createSelector(
  getWindows,
  _.mapValues(formatWindowTitle)
);
