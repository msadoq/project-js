import { dialog, BrowserWindow } from 'electron';

function openFileDialog(folder, type, callback) {
  dialog.showOpenDialog(
    BrowserWindow.getFocusedWindow(),
    {
      title: `Select a ${type}`,
      defaultPath: folder,
      buttonLabel: 'Open',
      filters: [{ name: 'data files', extensions: ['json'] }],
      properties: ['openFile']
    },
    callback,
  );
}

function saveFileDialog(folder, type, callback) {
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
    callback,
  );
}

export default function getPathByFilePicker(folder, type, action, callback) {
  return (action === 'open')
    ? openFileDialog(folder, type, callback)
    : saveFileDialog(folder, type, callback);
}
