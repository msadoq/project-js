import { v4 } from 'node-uuid';
import { getStore } from '../store/mainStore';
import { add, addAndMount as addAndMountPage, unmountAndRemove as unmountAndRemovePage } from '../store/mutations/windowActions';
import { addAndMount as addAndMountView, unmountAndRemove as unmountAndRemoveView } from '../store/mutations/pageActions';

const { Menu } = require('electron');
    /* NB: the native action-event (ex:'Quit') don't work with a function Click*/

const template = [{
  label: 'Workspace',
  submenu: [{
    label: 'Save ...',
    accelerator: 'Ctrl+Command+S',
    click() {
      console.log('workspace saved!')
    }
  }, {
    label: 'Quit',
    role: 'quit'
  }]
}, {
  label: 'Window',
  submenu: [{
    label: 'New',
    accelerator: '',
    click() {
      console.log('create a new window!!!!');
      getStore().dispatch(add(v4(), 'Test window'));
    }
  }, {
    label: 'Reload',
    accelerator: '',
    click(item, focusedWindow) {
      if (focusedWindow) focusedWindow.reload();
      console.log('window reloaded!')
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Developer Tools',
    accelerator: '',
    click(item, focusedWindow) {
      if (focusedWindow) focusedWindow.webContents.toggleDevTools();
      console.log('toggle dev tools actived!')
    }
  }, {
    label: 'Actual Size',
    role: 'resetzoom'
  }, {
    label: 'Zoom In',
    role: 'zoomin'
  }, {
    label: 'Zoom Out',
    role: 'zoomout'
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Full Screen',
    role: 'togglefullscreen'
  }, {
    type: 'separator'
  }, {
    label: 'Minimize',
    role: 'minimize'
  }, {
    label: 'Close',
    role: 'close'
  }]
}, {
  label: 'Page',
  submenu: [{
    label: 'Add ...',
    accelerator: '',
    click(item, focusedWindow) {
      console.log('page added!')
      getStore().dispatch(addAndMountPage(focusedWindow.windowId, v4(), 'add example'));
    // for add a page in a new window, we have to 'Reload' after action click 'Add'!
      console.log('window reloaded!')
      focusedWindow.reload();
    }
  }, {
    label: 'Open ...',
    accelerator: '',
    click() {
      console.log('page opened!')
    }
  }, {
    label: 'Save ...',
    accelerator: '',
    click() {
      console.log('page saved!')
    }
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Add ...',
    accelerator: '',
    click() {
      console.log('view added!')
      getStore().dispatch(addAndMountView(v4(), 'TV'));
    }
  }, {
    label: 'Open ...',
    accelerator: '',
    click() {
      console.log('view opened!')
    }
  }]
}, {
  label: 'Edit',
  submenu: [{
    role: 'undo',
  }, {
    role: 'redo',
  }, {
    type: 'separator',
  }, {
    role: 'cut',
  }, {
    role: 'copy',
  }, {
    role: 'paste',
  }, {
    role: 'pasteandmatchstyle',
  }, {
    role: 'delete',
  }, {
    role: 'selectall',
  }, ]
}];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
// Menu.remote.getCurrentWindow().setMenu(menu);
