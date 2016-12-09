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
    }, (selected) => {
      const filePath = (selected) ? selected[0] : undefined;
      if (!filePath) {
        callback('No path selected', filePath);
      } else {
        callback(null, filePath);
      }
    }
  );
}

function saveFileDialog(folder, type, callback) {
  dialog.showSaveDialog(
    BrowserWindow.getFocusedWindow(),
    {
      title: `Save a ${type} as`,
      defaultPath: folder,
      buttonLabel: 'Save',
      filters: [{ name: 'data files', extensions: ['json'] }],
    }, (selected) => {
      if (!selected) {
        callback('No path selected', selected);
      } else {
        callback(null, selected);
      }
    });
}

// le callback c'est ce qu on veut faire une fois le path est selectionné
export default function getPathByFilePicker(folder, type, action, callback) {
  if (action === 'open') {
    openFileDialog(folder, type, callback);
  } else {
    saveFileDialog(folder, type, callback);
  }
}
