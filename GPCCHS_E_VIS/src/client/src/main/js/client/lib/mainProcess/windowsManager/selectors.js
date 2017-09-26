// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Move getEditorWindowTitle from selectors/editor to windowsManager/selectors
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getWindowsTitle in windowsManager/selectors .
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove configuration check in windowsManagers/selectors
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Move isModified from state.windows to state.hsc
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getWindows } from '../../store/reducers/windows';
import { getView } from '../../store/reducers/views';
import { getWorkspaceIsModified } from '../../store/reducers/hsc';

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
