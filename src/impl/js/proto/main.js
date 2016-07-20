const electron = require('electron')
// Module to control application life.
const app = electron.app
app.commandLine.appendSwitch('no-proxy-server');
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindows () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, x: 0, y: 0})
  
  parameterWindow = new BrowserWindow({width: 800, height: 600, x: 810, y: 0})

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  parameterWindow.webContents.openDevTools()

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/views/plotIndex.html`)
  parameterWindow.loadURL(`file://${__dirname}/views/parametersView.html`)


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    parameterWindow.close();
  })
  parameterWindow.on('closed', function () {
    parameterWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindows)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindows()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
