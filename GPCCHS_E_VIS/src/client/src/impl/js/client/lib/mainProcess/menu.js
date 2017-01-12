import { v4 } from 'node-uuid';
import { getStore } from '../store/mainStore';
import { add } from '../store/actions/windows';
import { viewOpen, addPlotView, addTextView } from './menu/viewOpen';
import { pageOpen, pageAddNew } from './menu/pageOpen';
import { pageSave, pageSaveAs } from './menu/pageSave';
import { workspaceSave, workspaceSaveAs } from './menu/workspaceSave';
import { workspaceOpenNew, workspaceOpen } from './menu/workspaceOpen';

const { Menu } = require('electron');

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
      accelerator: 'Ctrl+N',
      click(item, focusedWindow) {
        workspaceOpenNew(focusedWindow);
      }
    }, {
      label: 'Open ... ',
      accelerator: 'Ctrl+O',
      click(item, focusedWindow) {
        workspaceOpen(focusedWindow);
      }
    }, {
      label: 'Save ...',
      accelerator: 'Ctrl+S',
      click: (item, focusedWindow) => {
        workspaceSave(focusedWindow);
      }
    }, {
      label: 'Save as...',
      accelerator: 'Ctrl+Shift+S',
      click: (item, focusedWindow) => {
        workspaceSaveAs(focusedWindow);
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
      label: 'Add ...',
      accelerator: '',
      click(item, focusedWindow) {
        pageAddNew(focusedWindow);
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        pageOpen(focusedWindow);
      }
    }, {
      label: 'Save ...',
      accelerator: '',
      click(item, focusedWindow) {
        pageSave(focusedWindow);
      }
    }, {
      label: 'Save As ...',
      accelerator: '',
      click(item, focusedWindow) {
        pageSaveAs(focusedWindow);
      }
    }]
  });

template.splice(3, 0,
  {
    label: 'View',
    submenu: [{
      label: 'Add PlotView...',
      accelerator: '',
      click(item, focusedWindow) {
        addPlotView(focusedWindow);
      }
    }, {
      label: 'Add TextView...',
      accelerator: '',
      click(item, focusedWindow) {
        addTextView(focusedWindow);
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        viewOpen(focusedWindow);
      }
    },
    ]
  });

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
