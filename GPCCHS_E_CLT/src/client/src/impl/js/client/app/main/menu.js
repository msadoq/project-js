import { v4 } from 'node-uuid';
import { getStore } from '../store/mainStore';
import { add, addAndMount as addAndMountPage, unmountAndRemove as unmountAndRemovePage } from '../store/mutations/windowActions';
import { addAndMount as addAndMountView, unmountAndRemove as unmountAndRemoveView } from '../store/mutations/pageActions';

const { Menu } = require('electron');

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
    // accelerator: 'Ctrl+Command+Q',
    // click() {
    //   console.log('workspace closed!'),
    /* NB: the native action-event (ex:'Quit') don't work with a function Click*/
    role: 'quit'
      // }
  }]
}, {
  label: 'Window',
  submenu: [{
    label: 'Reload',
    accelerator: '',
    click(item, focusedWindow) {
      if (focusedWindow) focusedWindow.reload();
      console.log('window reloaded!')
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: '',
    click(item, focusedWindow) {
      if (focusedWindow) focusedWindow.webContents.toggleDevTools();
      console.log('toggle dev tools actived!')
    }
  }, {
    label: 'Actual Size',
    // accelerator: '',
    // click() {
    //   console.log('reset zoom the window!'),
    // {
    role: 'resetzoom'
      // }
      // }
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
    label: 'New',
    accelerator: '',
    click() {
      console.log('create a new window!!!!');
      getStore().dispatch(add(v4(), 'Test window'));
    }
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
    label: 'Open ...',
    accelerator: '',
    click() {
      console.log('page opened!')
    }
  }, {
    label: 'Add ...',
    accelerator: '',
    click() {
      console.log('page added!')
      getStore().dispatch(addAndMountPage(v4(), 'window example'));
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
    label: 'Open ...',
    accelerator: '',
    click() {
      console.log('view opened!')
    }
  }, {
    label: 'Add ...',
    accelerator: '',
    click() {
      console.log('view added!')
      getStore().dispatch(addAndMountView(v4(), 'TV'));
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
