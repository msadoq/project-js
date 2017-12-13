// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Implement dialogObserver in mainProcess .
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Change openModal action, it now have a default dialogId
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { each } from 'lodash';
import electron from 'electron';

import getLogger from 'common/logManager';
import { dialogClosed } from 'store/actions/ui';
import { getAllDialogs } from 'store/reducers/ui/dialog';
import { getWindow } from '../windowsManager/windows';

const logger = getLogger('main:electronManager:dialogObserver');

const dialogs = {
  open: electron.dialog.showOpenDialog,
  save: electron.dialog.showSaveDialog,
  message: electron.dialog.showMessageBox,
};

const showDialog = (window, { type, options, id }, cb) => {
  if (!dialogs[type]) {
    logger.error(`unknown dialog type '${type}'`);
    return;
  }
  dialogs[type](window, options, choice => cb(window.windowId, choice, options, id));
};

const showDialogs = (dialogsByWindows, cb) => {
  each(dialogsByWindows, (windowDialogs, windowId) => {
    each(windowDialogs, (dialog, dialogId) => {
      showDialog(getWindow(windowId), { ...dialog, id: dialogId }, cb);
    });
  });
};

const getFullDialogKeys = (dialogState) => {
  const windowIds = _.keys(dialogState);
  const fullKeys = windowIds.map((windowId) => {
    const dialogIds = _.keys(dialogState[windowId]);
    return dialogIds.map(dialogId => `${windowId}.${dialogId}`);
  });
  return _.flatten(fullKeys);
};

const getDialogDifference = (newDialog, oldDialog) => {
  if (newDialog === oldDialog) {
    return {};
  }
  const diffKeys = _.difference(getFullDialogKeys(newDialog), getFullDialogKeys(oldDialog));
  return _.pick(diffKeys, newDialog);
};

export default function makeDialogObserver(store) {
  const getDialogState = () => getAllDialogs(store.getState());
  let prevDialogState = getDialogState();

  return () => {
    const dialogsToShow = getDialogDifference(getDialogState(), prevDialogState);
    if (!_.isEmpty(dialogsToShow)) {
      showDialogs(dialogsToShow, (windowId, choice, options, dialogId) => {
        store.dispatch(dialogClosed(windowId, choice, options, dialogId));
      });
    }
    prevDialogState = getDialogState();
  };
}
