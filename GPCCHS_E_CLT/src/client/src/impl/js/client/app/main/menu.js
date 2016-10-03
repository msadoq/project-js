import { v4 } from 'node-uuid';
import { getStore } from '../store/mainStore';
import { add, addAndMount as addAndMountPage, unmountAndRemove as unmountAndRemovePage } from '../store/mutations/windowActions';
import { addAndMount as addAndMountView, unmountAndRemove as unmountAndRemoveView } from '../store/mutations/pageActions';


// const remote = require('remote');
const { dialog } = require('electron');

const { Menu } = require('electron');
    /* NB: the native action-event (ex:'Quit') don't work with a function Click*/
    // TODO: change native action-event by functions onClick

const template = [{
  label: 'Workspace',
  submenu: [{
    label: 'Save ...',
    accelerator: 'Ctrl+Command+S',
    click: (item, focusedWindow) => {
      if (focusedWindow) dialog.showMessageBox({ type: 'warning', message: 'Do you confirm to save ?', buttons: ['ok', 'cancel'] });
      console.log('workspace saved!')
    }
  }, {
    label: 'Quit',
    role: 'quit'
  }]
}, {
  label: 'Window',
  submenu: [
    {
      label: 'New',
      accelerator: '',
      click() {
        console.log('create a new window!!!!');
        dialog.showMessageBox({ type: 'info', title: 'Opening new window', message: 'A new window is being opened... valid please', buttons: ['ok'] });
        getStore().dispatch(add(v4(), 'New window'));
        // console.log(add(v4()));
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
    }, {
      label: 'Close2', // do not works!
      click(focusedWindow) {
        if (focusedWindow) dialog.showMessageBox({ type: 'info', message: 'Do you want to close the window?', buttons: ['close', 'cancel'] });
      },
    }, {
      label: 'Close3',
      click(focusedWindow) {
        if (focusedWindow) dialog.showMessageBox({ type: 'info', message: 'Do you want to close the window?', buttons: ['close', 'cancel'] });
      },
    },
  ]
}, {
  label: 'Page',
  submenu: [{
    label: 'Add',
    accelerator: '',
    click(item, focusedWindow) {
      console.log('page added!')
      if (focusedWindow) dialog.showMessageBox({ type: 'info', title: 'Information', message: 'New page added!', buttons: ['ok'] });
      getStore().dispatch(addAndMountPage(focusedWindow.windowId, v4(), 'add example'));
      // {

      // } else {
      //   dialog.showErrorBox({ title: 'Information', message: 'error' });
      // }
    }
  }, {
    label: 'Open ...',
    accelerator: '',
    click(item, focusedWindow) {
      console.log('page opened!')
      if (focusedWindow) {
        dialog.showOpenDialog({
          title: 'Select a page',
          defaultPath: '',
          buttonLabel: 'Open a file',
          filters: [''],
          properties: ['openFile'],
          read: ('../app/documents/examples/PG.example.json')
        })
      }
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
  }]
}];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
// Menu.remote.getCurrentWindow().setMenu(menu);
