import { v4 } from 'uuid';
import { getStore } from '../../store/mainStore';
import { addWindow } from '../../store/actions/windows';
import { viewOpen, viewAddBlank } from './viewOpen';
import { pageOpen, pageAddBlank } from './pageOpen';
import { pageSave, pageSaveAs } from './pageSave';
import { workspaceSave, workspaceSaveAs } from './workspaceSave';
import { workspaceOpenNew, workspaceOpen } from './workspaceOpen';

import { getAvailableViews } from '../../viewManager';

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
  }],
}];
template.splice(0, 0,
  {
    label: 'Workspace',
    submenu: [{
      label: 'New ... ',
      accelerator: 'CmdOrCtrl+N',
      click(item, focusedWindow) {
        workspaceOpenNew(focusedWindow);
      },
    }, {
      label: 'Open ... ',
      accelerator: 'CmdOrCtrl+O',
      click(item, focusedWindow) {
        workspaceOpen(focusedWindow);
      },
    }, {
      label: 'Save',
      accelerator: 'CmdOrCtrl+S',
      click: (item, focusedWindow) => {
        workspaceSave(focusedWindow);
      },
    }, {
      label: 'Save as...',
      accelerator: 'CmdOrCtrl+Shift+S',
      click: (item, focusedWindow) => {
        workspaceSaveAs(focusedWindow);
      },
    }, {
      label: 'Quit',
      role: 'quit',
    }],
  });
template.splice(1, 0,
  {
    label: 'Window',
    submenu: [
      {
        label: 'New',
        accelerator: '',
        click() { getStore().dispatch(addWindow(v4(), 'New window')); },
      }, {
        label: 'Reload',
        accelerator: '',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        },
      }, {
        type: 'separator',
      }, {
        label: 'Toggle Developer Tools',
        accelerator: '',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        },
      }, {
        label: 'Actual Size',
        role: 'resetzoom',
      }, {
        label: 'Zoom In',
        role: 'zoomin',
      }, {
        label: 'Zoom Out',
        role: 'zoomout',
      }, {
        type: 'separator',
      }, {
        label: 'Toggle Full Screen',
        role: 'togglefullscreen',
      }, {
        type: 'separator',
      }, {
        label: 'Minimize',
        role: 'minimize',
      }, {
        label: 'Close',
        role: 'close',
      }],
  });
template.splice(2, 0,
  {
    label: 'Page',
    submenu: [{
      label: 'Add ...',
      accelerator: '',
      click(item, focusedWindow) {
        pageAddBlank(focusedWindow);
      },
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        pageOpen(focusedWindow);
      },
    }, {
      label: 'Save',
      accelerator: '',
      click(item, focusedWindow) {
        pageSave(focusedWindow);
      },
    }, {
      label: 'Save As ...',
      accelerator: '',
      click(item, focusedWindow) {
        pageSaveAs(focusedWindow);
      },
    }],
  });

const specificViewsMenu = getAvailableViews().map(viewType => ({
  label: `Add ${viewType}...`,
  accelerator: '',
  click: (item, focusedWindow) => viewAddBlank(viewType, focusedWindow),
}));

template.splice(3, 0,
  {
    label: 'View',
    submenu: [
      ...specificViewsMenu,
      {
        label: 'Open ...',
        accelerator: '',
        click(item, focusedWindow) {
          viewOpen(focusedWindow);
        },
      },
    ],
  });

const menu = Menu.buildFromTemplate(template);
export default () => Menu.setApplicationMenu(menu);
