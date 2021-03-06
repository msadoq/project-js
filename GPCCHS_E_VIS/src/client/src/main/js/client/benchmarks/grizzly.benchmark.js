// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #7281 : 18/07/2017 : First benchmark of Grizzly charting lib used in
//  PlotView.
// END-HISTORY
// ====================================================================

import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import { init } from '../lib/common/configurationManager';

init(__dirname, true);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

app.commandLine.appendSwitch('no-proxy-server');

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1400, height: 800 });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'grizzly.benchmark.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
