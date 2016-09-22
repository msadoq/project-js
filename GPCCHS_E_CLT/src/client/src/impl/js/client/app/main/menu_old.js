// TODO: code and refacoring the barmenu

/* NB: The Menu could not be available from Render Process without the Main Process
 we can use a 'Remote module' which deliver a inter-process communication (IPC)
 All manipulations and actions have to be created in first in Main Process! */

const { Menu } = require('electron');

const template = [
  {
    label: 'Workspace',
    submenu: [
      {
        label: 'Save ...',
        // click(item, focus){
        //   if(focus) function();
        // }
      },
      {
        label: 'Quit',
        role: 'quit'
      }
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Reload',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Developer Tools',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        }

      },
      {
        type: 'separator'
      },
      {
        label: 'Actual Size',
        role: 'resetzoom'
      },

      {
        label: 'Zoom In',
        role: 'zoomin'
      },
      {
        label: 'Zoom Out',
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        label: 'Toggle Full Screen',
        role: 'togglefullscreen'
      },
      {
        type: 'separator'
      },
      {
        label: 'Minimize',
        role: 'minimize'
      },
      {
        label: 'New ... ',
 // here, a second workspace is opened because of BrowserWindows in app/main/window
 // only when we duplicate a piece of 'dev.workspace.json', it works
      },
      {
        label: 'Close',
        role: 'close'
      },
    ]
  },
  {
    label: 'Page',
    submenu: [
      {
        // label: 'Open ...',
          // role: 'open'
      },
      {
        label: 'Add ...',
          // role: 'add'
      },
      {
        label: 'Save ...',
        // role: 'save'
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Open ...',
        // role: 'open'
      },
      {
        label: 'Add ...',
        //  role:'add'
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo',
      },
      {
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        role: 'cut',
      },
      {
        role: 'copy',
      },
      {
        role: 'paste',
      },
      {
        role: 'pasteandmatchstyle',
      },
      {
        role: 'delete',
      },
      {
        role: 'selectall',
      },
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
