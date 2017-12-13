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
