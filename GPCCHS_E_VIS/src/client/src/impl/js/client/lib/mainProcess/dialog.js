import _isFunction from 'lodash/isFunction';
import { dialog } from 'electron';

export function showErrorMessage(focusedWindow, errTitle, errMsg, callback) {
  dialog.showMessageBox(
    focusedWindow,
    {
      type: 'error',
      title: errTitle,
      message: errMsg,
      buttons: ['ok'],
    },
    _isFunction(callback) ? callback : undefined
  );
}
export function showWarningMessage(focusedWindow, title, msg, buttons, callback) {
  return showMessageDialog('warning', focusedWindow, title, msg, buttons, callback);
}

export function showQuestionMessage(focusedWindow, title, msg, buttons, callback) {
  return showMessageDialog('question', focusedWindow, title, msg, buttons, callback);
}

function showMessageDialog(type, focusedWindow, title, msg, buttons, callback) {
  return dialog.showMessageBox(
    focusedWindow,
    {
      type,
      title,
      message: msg,
      buttons,
    },
    _isFunction(callback) ? callback : undefined
  );
}
