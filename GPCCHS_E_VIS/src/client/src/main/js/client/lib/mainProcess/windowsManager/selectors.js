import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getWindows } from 'store/reducers/windows';
import { getView } from 'store/reducers/views';
import { getWorkspaceIsModified } from 'store/reducers/hsc';

export const getEditorWindowTitle = (state, { viewId }) => {
  if (!viewId) {
    return '';
  }

  const props = { viewId };
  const view = getView(state, props);
  if (!view) {
    return '';
  }

  return `Code editor - ${view.title}`;
};

const formatWindowTitle = isModified => win => `${win.title}${(isModified === true) ? ' *' : ''} - VIMA`;
export const getWindowsTitle = createSelector(
  getWindows,
  getWorkspaceIsModified,
  (windows, isModified) => _.mapValues(formatWindowTitle(isModified), windows)
);
