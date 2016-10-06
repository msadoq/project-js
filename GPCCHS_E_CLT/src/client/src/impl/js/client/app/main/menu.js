import { v4 } from 'node-uuid';
import { getStore } from '../store/mainStore';
import { add, addAndMount as addAndMountPage } from '../store/mutations/windowActions';
import { addAndMount as addAndMountView } from '../store/mutations/pageActions';

const { dialog } = require('electron');

const { Menu } = require('electron');

//TODO: instead of the native menu Electron, add actionsMenu on RendererProcess to enhance a customized menubar


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
      label: 'Save ...',
      accelerator: 'Ctrl+Command+S',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          dialog.showMessageBox({
            type: 'warning',
            message: 'Do you confirm to save ?',
            buttons: ['ok', 'cancel'] });
        console.log('workspace saved!');
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
        click() {
          dialog.showMessageBox({
            type: 'info',
            title: 'Opening new window',
            message: 'A new window is being opened... valid please',
            buttons: ['ok']
          });
          getStore().dispatch(add(v4(), 'New window'));
          dialog.showMessageBox({
            title: 'Do not forget !',
            message: 'New window is empty',
            detail: 'This window needs creating a page, in Menu: Page > Add',
            buttons: ['I understood']
          });
        }
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
          dialog.showMessageBox({
            type: 'info',
            title: 'Information',
            message: 'New page added!',
            buttons: ['ok']
          });
          getStore().dispatch(addAndMountPage(focusedWindow.windowId, v4(), 'add example'));
        }
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        console.log('page opened!');
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
        console.log('page saved!');
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
        console.log('view added!');
        getStore().dispatch(addAndMountView(v4(), 'TV'));
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click() {
        console.log('view opened!');
      }
    }]
  });

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
