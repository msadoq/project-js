import { BrowserWindow } from 'electron';
import { getStore } from '../../../store/mainStore';
import { getView } from '../../../store/reducers/views';
import { reloadView } from '../../../documentManager';
import { showWarningMessage } from '../../dialog';

export default function ({ viewId }) {
  const { dispatch, getState } = getStore();
  const { absolutePath, isModified } = getView(getState(), { viewId });

  if (!isModified) {
    return dispatch(reloadView(viewId, absolutePath));
  }

  // if view was modified but not already saved ask for confirmation
  return showWarningMessage(
    BrowserWindow.getFocusedWindow(),
    'Unsaved view',
    'If you continue, view modifications will be lost.',
    ['cancel', 'continue'],
    (button) => {
      if (button !== 0) {
        dispatch(reloadView(viewId, absolutePath));
      }
    }
  );
}
