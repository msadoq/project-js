import _get from 'lodash/get';
import { BrowserWindow } from 'electron';
import { getStore } from '../../../store/mainStore';
import { getView } from '../../../store/selectors/views';
import { reloadView } from '../../../store/actions/views';
import { add } from '../../../store/actions/messages';
import { readViews } from '../../../common/documentManager';
import { showWarningMessage } from '../../dialog';

function reload(viewId, absolutePath) {
  const { dispatch } = getStore();
  readViews([{ absolutePath }], (err, views) => {
    if (err) {
      return getStore().dispatch(add(
        viewId,
        'danger',
        'Invalid View file selected'
      ));
    }

    const configuration = _get(views, [0, 'configuration']);
    if (!configuration) {
      return dispatch(add(
        viewId,
        'danger',
        'Unable to load view (is view file configuration valid ?)'
      ));
    }

    dispatch(reloadView(viewId, configuration));
    return dispatch(add(
      viewId,
      'success',
      'View reloaded'
    ));
  });
}

export default function ({ viewId }) {
  const { absolutePath, isModified } = getView(getStore().getState(), viewId);

  if (!isModified) {
    return reload(viewId, absolutePath);
  }

  // if view was modified but not already saved ask for confirmation
  return showWarningMessage(
    BrowserWindow.getFocusedWindow(),
    'Unsaved view',
    'If you continue, view modifications will be lost.',
    ['cancel', 'continue'],
    (button) => {
      if (button !== 0) {
        reload(viewId, absolutePath);
      }
    });
}
