import _ from 'lodash/fp';
import { BrowserWindow } from 'electron';
import { getStore } from '../../../store/mainStore';
import { getView } from '../../../store/selectors/views';
import { reloadView } from '../../../store/actions/views';
import { add } from '../../../store/actions/messages';
import { showWarningMessage } from '../../dialog';
import { simpleReadView } from '../../../documentManager/readView';

function reload(viewId, absolutePath) {
  const { dispatch } = getStore();
  simpleReadView({ absolutePath }, (err, view) => {
    if (err) {
      return getStore().dispatch(add(
        viewId,
        'danger',
        'Invalid View file selected'
      ));
    }

    dispatch(reloadView(viewId, _.set('uuid', viewId, view)));
    return dispatch(add(
      viewId,
      'success',
      'View reloaded'
    ));
  });
}

export default function ({ viewId }) {
  const { absolutePath, isModified } = getView(getStore().getState(), { viewId });

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
