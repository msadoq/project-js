import { v4 } from 'node-uuid';

import { getStore } from '../store/mainStore';
import { add, addAndMount as addAndMountPage } from '../store/actions/windows';
import { addAndMount as addAndMountView } from '../store/actions/pages';

const { Menu, dialog } = require('electron');

const template = [{
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
  }]
}];
template.splice(0, 0,
  {
    label: 'Workspace',
    submenu: [{
      label: 'New ... ',
      accelerator: '',
      click() {
        dialog.showMessageBox({
          type: 'info',
          title: 'Opening new workspace',
          message: 'A new workspace is being opened... valid please',
          buttons: ['ok']
        });
        // getStore().dispatch(add(v4(), 'New workspace'));
        dialog.showMessageBox({
          title: 'Do not forget !',
          message: 'New workspace is empty',
          detail: 'This workspace needs creating a window, in Menu: Window > New',
          buttons: ['I understood']
        });
      }
    }, {
      label: 'Save ...',
      accelerator: 'Ctrl+Command+S',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          dialog.showMessageBox({
            type: 'warning',
            message: 'Do you confirm to save ?',
            buttons: ['ok', 'cancel'] });
          // TODO save workspace
        }
      }
    }, {
      label: 'Quit',
      role: 'quit'
    }]
  });
template.splice(1, 0,
  {
    label: 'Window',
    submenu: [
      {
        label: 'New',
        accelerator: '',
        click() { getStore().dispatch(add(v4(), 'New window')); }
      }, {
        label: 'Reload',
        accelerator: '',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      }, {
        type: 'separator'
      }, {
        label: 'Toggle Developer Tools',
        accelerator: '',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
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
  });
template.splice(2, 0,
  {
    label: 'Page',
    submenu: [{
      label: 'Add',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          getStore().dispatch(addAndMountPage(focusedWindow.windowId, v4(), 'add example'));
        }
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          dialog.showOpenDialog({
            title: 'Select a page',
            defaultPath: '',
            buttonLabel: 'Open a file',
            filters: [''],
            properties: ['openFile'],
            read: ('../app/documents/examples/PG.example.json')
          });
        }
      }
    }, {
      label: 'Save ...',
      accelerator: '',
      click() {
        // TODO save page
      }
    }]
  });

template.splice(3, 0,
  {
    label: 'View',
    submenu: [{
      label: 'Add ...',
      accelerator: '',
      click() {
        getStore().dispatch(addAndMountView(v4(), 'TV'));
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click() {
        // TODO open view
      }
    }]
  });

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
