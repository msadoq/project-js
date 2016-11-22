import { v4 } from 'node-uuid';
import path from 'path';
import { getStore } from '../store/mainStore';
import { add, addAndMount as addAndMountPage } from '../store/actions/windows';
import { isWorkspaceOpening, closeWorkspace } from '../store/actions/hsc';
import { openDefaultWorkspace, readWkFile } from './openWorkspace';
import getPathByFilePicker from './filePicker';
import { addNewView, openView, openPage, allDocumentsAreSaved } from './fileTreatment';


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
      accelerator: 'Ctrl+N',
      click() {
        if (!allDocumentsAreSaved(getStore().getState(), getStore().dispatch)) {
          return;   // case of cancel
        }
        const folder = getStore().getState().hsc.folder;
        getStore().dispatch(closeWorkspace());
        openDefaultWorkspace(getStore().dispatch, folder);
      }
    }, {
      label: 'Open ... ',
      accelerator: 'Ctrl+O',
      click() {
        if (!allDocumentsAreSaved(getStore().getState(), getStore().dispatch)) {
          return;   // case of cancel
        }
        const folder = getStore().getState().hsc.folder;
        // open the file picker
        const filePath = getPathByFilePicker(folder, 'workspace');
        if (filePath) {
          getStore().dispatch(isWorkspaceOpening(true));
          getStore().dispatch(closeWorkspace());
          readWkFile(
            getStore().dispatch,
            getStore().getState,
            path.dirname(filePath),
            path.basename(filePath),
            () => {
              getStore().dispatch(isWorkspaceOpening(false));
            }
          );
        }
      }
    }, {
      label: 'Save ...',
      accelerator: 'Ctrl+S',
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
      label: 'Save as...',
      accelerator: 'Ctrl+Shift+S',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          dialog.showMessageBox({
            type: 'warning',
            message: 'Do you confirm to save as?',
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
          getStore().dispatch(addAndMountPage(focusedWindow.windowId, v4()));
        }
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          const filepath = getPathByFilePicker(getStore().getState().hsc.folder, 'page');
          openPage(filepath, focusedWindow.windowId);
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
      label: 'Add PlotView...',
      accelerator: '',
      click(item, focusedWindow) {
        const view = {
          type: 'PlotView',
          configuration: {
            type: 'PlotView',
            axes: [],
            grids: [],
            legend: {},
            markers: [],
            plotBackgroundColour: '3FFFFFF',
            defaultRatio: { length: 5, width: 5 },
            entryPoints: [],
            links: [],
            title: 'New Plot View',
          } };
        addNewView(focusedWindow, view);
      }
    }, {
      label: 'Add TextView...',
      accelerator: '',
      click(item, focusedWindow) {
        const view = {
          type: 'TextView',
          configuration: {
            type: 'TextView',
            content: [],
            defaultRatio: { length: 5, width: 5 },
            entryPoints: [],
            links: [],
            title: 'New Text View',
          } };
        addNewView(focusedWindow, view);
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          const state = getStore().getState();
          const filepath = getPathByFilePicker(state.hsc.folder, 'view');
          openView(filepath, state.windows[focusedWindow.windowId].focusedPage);
        }
      }
    }]
  });

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
