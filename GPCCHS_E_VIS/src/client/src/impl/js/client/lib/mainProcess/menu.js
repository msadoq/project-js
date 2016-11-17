import { v4 } from 'node-uuid';
import _map from 'lodash/map';
import path from 'path';
import { getStore } from '../store/mainStore';
import { add, addAndMount as addAndMountPage, focusPage, mountPage } from '../store/actions/windows';
import { closeWorkspace } from '../store/actions/workspace';
import { isWorkspaceOpening } from '../store/actions/hsc';
import { add as addPage, mountView, updateLayout } from '../store/actions/pages';
import { add as addView } from '../store/actions/views';
import { extractViews, readViews } from '../documentsManager/extractViews';
import { readPages } from '../documentsManager/extractPages';
import { openDefaultWorkspace, readWkFile } from './openWorkspace';
import getPathByFilePicker from './filePicker';

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
        // TODO save doc if needed
        // dialog.showMessageBox({
        //   type: 'info',
        //   title: 'Opening new workspace',
        //   message: 'A new workspace is being opened... valid please',
        //   buttons: ['ok', 'cancel']
        // });
        const folder = getStore().getState().workspace.folder;
        getStore().dispatch(closeWorkspace());
        openDefaultWorkspace(getStore().dispatch, folder);
      }
    }, {
      label: 'Open ... ',
      accelerator: 'Ctrl+O',
      click() {
        // TODO save doc if needed
        // dialog.showMessageBox({
        //   type: 'info',
        //   title: 'Opening new workspace',
        //   message: 'A new workspace is being opened... valid please',
        //   buttons: ['ok', 'cancel']
        // });
        const folder = getStore().getState().workspace.folder;
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
          getStore().dispatch(addAndMountPage(focusedWindow.windowId, v4(), 'add example'));
        }
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          const filepath = getPathByFilePicker(getStore().getState().workspace.folder, 'page');
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
      label: 'Add ...',
      accelerator: '',
      click(item, focusedWindow) {
        const pageId = getStore().getState().windows[focusedWindow.windowId].focusedPage;
        const viewId = v4();
        const config = {
          type: 'TextView',
          uuid: viewId,
        };
        getStore().dispatch(addView(viewId, 'TextView', config));
        getStore().dispatch(mountView(pageId, viewId));
        // TODO : pouvoir choix du type view et du la config par defaut
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          const state = getStore().getState();
          const filepath = getPathByFilePicker(state.workspace.folder, 'view');
          openView(filepath, state.windows[focusedWindow.windowId].focusedPage);
        }
      }
    }]
  });

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function openPage(absolutePath, windowId) {
  if (!absolutePath) {
    return;
  }
  const uuid = v4();
  const pageToRead = [{ absolutePath }];
  readPages(undefined, pageToRead, (pageErr, pages) => {
    if (pageErr) {
      // logger.error(pageErr);
      dialog.showMessageBox({
        type: 'error',
        title: 'Error on selected page',
        message: 'Invalid Page\'s file selected',
        buttons: ['ok']
      });
      const filepath = getPathByFilePicker(path.dirname(absolutePath), 'page');
      if (filepath) {
        return openPage(filepath, windowId);
      }
      return;
    }

    const content = { pages: {} };
    content.pages[uuid] = pages[0];
    extractViews(content, (viewErr, pageAndViews) => {
      if (viewErr) {
        // logger.error(viewErr);
        dialog.showMessageBox({
          type: 'error',
          title: 'Error on selected page',
          message: 'Invalid views on selected Page',
          buttons: ['ok']
        });
        const filepath = getPathByFilePicker(path.dirname(absolutePath), 'page');
        if (filepath) {
          return openPage(filepath, windowId);
        }
        return;
      }
      showSelectedPage(pageAndViews, uuid, windowId);
    });
  });
}


function openView(absolutePath, pageId) {
  if (!absolutePath) {
    return;
  }
  const viewPath = [{ absolutePath }];

  readViews(viewPath, (err, view) => {
    if (err) {
      dialog.showMessageBox({
        type: 'error',
        title: 'Error on selected view',
        message: `Invalid view. ${err}`,
        buttons: ['ok']
      });
      return;
    }
    showSelectedView(view[0], pageId);
  });
}

function showSelectedPage(pageAndViews, pageId, windowId) {
  const store = getStore();
  store.dispatch(addPage(pageId, null, pageAndViews.pages[pageId].title,
    pageAndViews.views));
  store.dispatch(mountPage(windowId, pageId));
  store.dispatch(focusPage(windowId, pageId));
  const viewIds = Object.keys(pageAndViews.views);
  viewIds.forEach((index) => {
    const view = pageAndViews.views[index];
    store.dispatch(addView(index, view.type, view.configuration));
    store.dispatch(mountView(pageId, index));
  });
  const layout = _map(pageAndViews.views, v => ({
    i: v.uuid,
    kind: v.geometry.kind,
    x: v.geometry.x,
    y: v.geometry.y,
    w: v.geometry.w,
    h: v.geometry.h,
  }));
  store.dispatch(updateLayout(pageId, layout));
}


function showSelectedView(view, pageId) {
  const viewId = v4();
  const store = getStore();
  store.dispatch(addView(viewId, view.type, view.configuration));
  // TODO walid: recalculer le x et le y en fonction des autres vues de la page
  // avant de dispatcher le layout
  const layout = store.getState().pages[pageId].layout;
  let newY = 0;
  layout.forEach((elem) => {
    const val = elem.y + elem.h;
    if (val > newY) {
      newY = val;
    }
  });
  layout.push({ i: viewId, kind: 'Relative', x: 0, y: newY, w: 5, h: 5 });
  store.dispatch(updateLayout(pageId, layout));
  store.dispatch(mountView(pageId, viewId));
}
