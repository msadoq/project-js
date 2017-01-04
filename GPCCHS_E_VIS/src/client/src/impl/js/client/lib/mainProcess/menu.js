import { v4 } from 'node-uuid';
import path from 'path';
import { getStore } from '../store/mainStore';
import { add, addAndMount as addAndMountPage, setModified as setModifiedWindow } from '../store/actions/windows';
import { isWorkspaceOpening, closeWorkspace } from '../store/actions/hsc';
import { setModified as setModifiedPage } from '../store/actions/pages';
import { openDefaultWorkspace, readWkFile } from './openWorkspace';
import getPathByFilePicker from './filePicker';
import { addNewView, openView, openPage, allDocumentsAreSaved,
  ungivenPaths, updateWorkspacePath, updatePagePath, showErrorMessage } from './fileTreatment';
import { savePage } from '../documentsManager/savePage';
import { saveWorkspace } from '../documentsManager/saveWorkspace';
import { getModifiedViewsIds } from '../store/selectors/views';
import { getPageModifiedViewsIds, getModifiedPagesIds } from '../store/selectors/pages';


const { Menu, dialog, BrowserWindow } = require('electron');

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
        allDocumentsAreSaved(getStore(), getStore().dispatch, (err) => {
          if (err) {
            return;
          }
          const folder = getStore().getState().hsc.folder;
          getStore().dispatch(closeWorkspace());
          openDefaultWorkspace(getStore().dispatch, folder);
        });
      }
    }, {
      label: 'Open ... ',
      accelerator: 'Ctrl+O',
      click(item, focusedWindow) {
        allDocumentsAreSaved(getStore(), getStore().dispatch, (err) => {
          if (err) {
            return;
          }
          const folder = getStore().getState().hsc.folder;
          // open the file picker
          getPathByFilePicker(folder, 'workspace', 'open', (errFile, filePath) => {
            if (filePath) {
              getStore().dispatch(isWorkspaceOpening(true));
              readWkFile(
                getStore().dispatch,
                getStore().getState,
                path.dirname(filePath),
                path.basename(filePath),
                (errWk) => {
                  if (errWk) {
                    showErrorMessage(focusedWindow,
                      'Error on selected workspace',
                      'Invalid Workspace file selected');
                  }
                  getStore().dispatch(isWorkspaceOpening(false));
                }
              );
            }
          });
        });
      }
    }, {
      label: 'Save ...',
      accelerator: 'Ctrl+S',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          if (getModifiedPagesIds(getStore().getState()).length > 0
            || getModifiedViewsIds(getStore().getState()).length > 0) {
            dialog.showErrorBox('Error', 'Please, save the pages and views of this workspace');
          } else {
            const idsToSave = ungivenPaths();
            const store = getStore();
            if (idsToSave.workspace) {
              updateWorkspacePath(idsToSave.workspace, store, store.dispatch, (err) => {
                if (err) {
                  return;
                }
                saveWorkspace(getStore().getState(), false, (errWin, winIds) => {
                  if (errWin) {
                    return;
                  }
                  winIds.forEach((winId) => {
                    getStore().dispatch(setModifiedWindow(winId, false));
                  });
                  const title = getStore().getState().windows[focusedWindow.windowId].title;
                  focusedWindow.setTitle(title.concat(' - VIMA'));
                });
              });
            } else {
              saveWorkspace(getStore().getState(), false, (errWin, winIds) => {
                if (errWin) {
                  return;
                }
                winIds.forEach((winId) => {
                  getStore().dispatch(setModifiedWindow(winId, false));
                });
                const title = getStore().getState().windows[focusedWindow.windowId].title;
                focusedWindow.setTitle(title.concat(' - VIMA'));
              });
            }
          }
        }
      }
    }, {
      label: 'Save as...',
      accelerator: 'Ctrl+Shift+S',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          if (getModifiedPagesIds(getStore().getState()).length > 0
            || getModifiedViewsIds(getStore().getState()).length > 0) {
            dialog.showErrorBox('Error', 'Please, save the pages and views of this workspace');
          } else {
            const idsToSave = ungivenPaths(true);
            const store = getStore();
            updateWorkspacePath(idsToSave.workspace, store, store.dispatch, (err) => {
              if (err) {
                return;
              }
              saveWorkspace(getStore().getState(), false, (errWin, winIds) => {
                if (errWin) {
                  return;
                }
                winIds.forEach((winId) => {
                  getStore().dispatch(setModifiedWindow(winId, false));
                });
                const title = getStore().getState().windows[focusedWindow.windowId].title;
                focusedWindow.setTitle(title.concat(' - VIMA'));
              });
            });
          }
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
      label: 'Add ...',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          const uuid = v4();
          getStore().dispatch(addAndMountPage(focusedWindow.windowId, uuid));
          getStore().dispatch(setModifiedPage(uuid, true));
          const title = getStore().getState().windows[focusedWindow.windowId].title;
          focusedWindow.setTitle(title.concat(' * - VIMA'));
        }
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          getPathByFilePicker(getStore().getState().hsc.folder, 'page', 'open', (err, filePath) => {
            if (err) {
              return;
            }
            openPage(filePath, focusedWindow.windowId);
            const title = getStore().getState().windows[focusedWindow.windowId].title;
            focusedWindow.setTitle(title.concat(' * - VIMA'));
          });
        }
      }
    }, {
      label: 'Save ...',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          const store = getStore();
          const pageId = store.getState().windows[focusedWindow.windowId].focusedPage;
          if (getPageModifiedViewsIds(store.getState(), pageId).length > 0) {
            dialog.showErrorBox('Error', 'Please, save the views of this page');
          } else {
            const page = store.getState().pages[pageId];
            if (!page.oId && !page.absolutePath) {
              updatePagePath(pageId, store, store.dispatch, (errUp, pId) => {
                if (errUp) {
                  return;
                }
                savePage(store.getState(), pId, false, (err) => {
                  if (err) {
                    return;
                  }
                  store.dispatch(setModifiedPage(pId, false));
                });
              });
            } else {
              savePage(store.getState(), pageId, false, (err) => {
                if (err) {
                  return;
                }
                store.dispatch(setModifiedPage(pageId, false));
              });
            }
          }
        }
      }
    }, {
      label: 'Save As ...',
      accelerator: '',
      click(item, focusedWindow) {
        const store = getStore();
        const pageId = store.getState().windows[focusedWindow.windowId].focusedPage;
        if (getPageModifiedViewsIds(store.getState(), pageId).length) {
          dialog.showErrorBox('Error', 'Please, save the views of this page');
        } else {
          updatePagePath(pageId, store, store.dispatch, (errUp, pId) => {
            if (errUp) {
              return;
            }
            savePage(store.getState(), pId, false, (err) => {
              if (err) {
                return;
              }
              store.dispatch(setModifiedPage(pId, false));
            });
          });
        }
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
            axes: {},
            grids: [],
            legend: {},
            markers: [],
            backgroundColor: '3FFFFFF',
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
            content: '',
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
          getPathByFilePicker(state.hsc.folder, 'view', 'open', (err, filePath) => {
            if (err) {
              return;
            }
            openView(filePath, state.windows[focusedWindow.windowId].focusedPage);
          });
        }
      }
    },
    ]
  });

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
