import { dialog, BrowserWindow } from 'electron';
import debug from '../common/debug/mainDebug';

const logger = debug('mainProcess:filePicker');
/**
 * show a file picker
 * @param folder : base folder of file picker
 * @param type of component to open : 'workspace', 'page' or 'view'
 * @return filepath or undefined si cancel
 */
function openFileDialog(folder, type) {
  return dialog.showOpenDialog(
    BrowserWindow.getFocusedWindow(),
    {
      title: `Select a ${type}`,
      defaultPath: folder,
      buttonLabel: 'Open',
      filters: [{ name: 'data files', extensions: ['json'] }],
      properties: ['openFile']
    });
}

export default function getPathByFilePicker(folder, type, action = 'open') {
  let filePath;
  if (action === 'open') {
    filePath = openFileDialog(folder, type);
    if (filePath) {
      return filePath[0];
    }
  } else {
    return saveFileDialog(folder, type);
  }
  return undefined;
}

function saveFileDialog(folder, type) {
  return dialog.showSaveDialog(
    BrowserWindow.getFocusedWindow(),
    {
      title: `Select a ${type}`,
      defaultPath: folder,
      buttonLabel: 'Save',
      filters: [{ name: 'data files', extensions: ['json'] }],
    });
}
