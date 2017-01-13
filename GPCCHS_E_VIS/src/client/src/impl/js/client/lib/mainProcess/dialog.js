import _isFunction from 'lodash/isFunction';
import { dialog, BrowserWindow } from 'electron';

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

export function showMessageDialog(type, focusedWindow, title, msg, buttons, callback) {
  return dialog.showMessageBox(
    focusedWindow,
    {
      type: type,
      title: title,
      message: msg,
      buttons: buttons,
      defaultId: 0 , // the fist index
      cancelId: (buttons.length -1) // the last index of buttons
    },
    _isFunction(callback) ? callback : undefined
  );
}

export function openFileDialog(folder, type, callback) {
  dialog.showOpenDialog(
    BrowserWindow.getFocusedWindow(),
    {
      title: `Select a ${type}`,
      defaultPath: folder,
      buttonLabel: 'Open',
      filters: [{ name: 'data files', extensions: ['json'] }],
      properties: ['openFile']
    },
    selected => ((selected && selected[0]) ? callback(null, selected[0]) : callback(null))
  );
}

export function saveFileDialog(folder, type, callback) {
  dialog.showSaveDialog(
    BrowserWindow.getFocusedWindow(),
    {
      title: `Save a ${type} as`,
      defaultPath: folder,
      buttonLabel: 'Save',
      filters: [{
        name: 'data files',
        extensions: ['json'],
      }],
    },
    selected => callback(null, selected));
}

export function getPathByFilePicker(folder, type, action, callback) {
  return (action === 'open')
    ? openFileDialog(folder, type, callback)
    : saveFileDialog(folder, type, callback);
}
