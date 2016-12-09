import _map from 'lodash/map';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import { v4 } from 'node-uuid';
import path from 'path';
import { dialog, BrowserWindow } from 'electron';
import { add as addView, updateAbsolutePath as updateAbsViewPath, setModified as setModifiedView } from '../store/actions/views';
import { addAndMount as addAndMountView, updateAbsolutePath as updateAbsPagePath } from '../store/actions/pages';
import { addAndMount as addAndMountPage, setModified as setModifiedWindow } from '../store/actions/windows';
import { updatePath } from '../store/actions/hsc';
import { extractViews, readViews } from '../documentsManager/extractViews';
import { readPages } from '../documentsManager/extractPages';
import { getStore } from '../store/mainStore';
import getPathByFilePicker from './filePicker';
import { saveWorkspace, updateSavedWinTitle } from '../documentsManager/saveWorkspace';
import { saveView } from '../documentsManager/saveView';
import { requestPathFromOId } from './websocket';
import { getModifiedPagesIds } from '../store/selectors/pages';
import { getModifiedViewsIds } from '../store/selectors/views';

import structures from '../dataManager/structures';
import vivl from '../../VIVL/main';

function showErrorMessage(focusedWindow, errTitle, errMsg, callback) {
  dialog.showMessageBox(
    focusedWindow,
    {
      type: 'error',
      title: errTitle,
      message: errMsg,
      buttons: ['ok']
    }, () => callback);
}

export function openPage(folder, windowId) {
  if (!folder) {
    return;
  }
  const uuid = v4();
  const focusedWindow = BrowserWindow.getFocusedWindow();
  getPathByFilePicker(folder, 'page', 'open', (err, filePath) => {
    if (err) {
      return;
    }
    if (filePath) {
      readPages(undefined, requestPathFromOId, [{ filePath }], (pageErr, pages) => {
        if (pageErr) {
          return showErrorMessage(focusedWindow,
            'Error on selected page',
            'Invalid Page\'s file selected',
            null);
        }
        const content = { pages: {} };
        content.pages[uuid] = pages[0];
        extractViews(content, requestPathFromOId, (viewErr, pageAndViews) => {
          if (viewErr) {
            return showErrorMessage(focusedWindow,
              'Error on selected page',
              'Invalid Page\'s file selected',
              null);
          }
          showSelectedPage(pageAndViews, uuid, windowId);
        });
      });
    }
  });
}

export function openView(folder, pageId) {
  if (!folder) {
    return;
  }
 // const viewPath = [{ absolutePath }];
  const focusedWindow = BrowserWindow.getFocusedWindow();
  getPathByFilePicker(folder, 'page', 'open', (err, viewPath) => {
    if (err) {
      return;
    }
    if (viewPath) {
      readViews(viewPath, requestPathFromOId, (errView, view) => {
        if (errView) {
          return showErrorMessage(focusedWindow,
            'Error on selected page',
            'Invalid Page\'s file selected',
            null);
        }
        const current = view[0];
        current.absolutePath = viewPath; // viewPath;
        showSelectedView(current, pageId);
      });
    }
  });
}

function showSelectedPage(pageAndViews, pageId, windowId) {
  const store = getStore();
  const layout = _map(pageAndViews.views, v => ({
    i: v.uuid,
    x: v.geometry.x,
    y: v.geometry.y,
    w: v.geometry.w,
    h: v.geometry.h,
  }));
  const viewIds = Object.keys(pageAndViews.views);
  viewIds.forEach((index) => {
    const view = pageAndViews.views[index];
    store.dispatch(addView(index, view.type, view.configuration, view.path, view.oId,
      view.absolutePath, false));
  });
  const page = pageAndViews.pages[pageId];
  page.layout = layout;
  page.views = viewIds;
  store.dispatch(addAndMountPage(windowId, pageId, page));
  // TODO set isModified to false
}

function showSelectedView(view, pageId) {
  const viewId = v4();
  // Add timeline Id
  const state = getStore().getState();
  const tbId = state.pages[pageId].timebarId;
  const timelineIds = state.timebars[tbId].timelines;
  const structureType = vivl(view.type, 'structureType')();

  try {
    // eslint-disable-next-line no-param-reassign
    view.configuration = structures(structureType, 'addTimelineId')(view.configuration,
      timelineIds, state.timelines);
  } catch (e) {
    // nothing to do
  }
  getStore().dispatch(addAndMountView(pageId, viewId, view, addViewInLayout(pageId, viewId)));
}

export function addNewView(focusedWindow, view) {
  const pageId = getStore().getState().windows[focusedWindow.windowId].focusedPage;
  const viewId = v4();
  getStore().dispatch(addAndMountView(pageId, viewId, view, addViewInLayout(pageId, viewId)));
  getStore().dispatch(setModifiedView(viewId, true));
}

function addViewInLayout(pageId, viewId) {
  if (!viewId) {
    return;
  }
  if (!getStore().getState().pages[pageId]) {
    return [{ i: viewId, w: 5, h: 5, x: 0, y: 0 }];
  }
  return getStore().getState().pages[pageId].layout.concat({
    i: viewId, w: 5, h: 5, x: 0, y: 0
  });
}

// Returns if at least one file is modified considering level
export function isSaveNeeded(type, state) {
  const win = _find(state.windows, ['isModified', true]);
  const page = _find(state.pages, ['isModified', true]);
  const view = _find(state.views, ['isModified', true]);
  if (!win && !page && !view) {
    return false;
  }
  return true;
}

// returns if all documents have a path or an oId given
export function ungivenPaths(all = false) {
  const state = getStore().getState();
  const ungivenPath = { workspace: false };
  ungivenPath.views = _reduce(state.views, (list, view, key) => {
    if ((!view.oId && !view.absolutePath) || all) {
      list.push(key);
    }
    return list;
  }, []);
  ungivenPath.pages = _reduce(state.pages, (list, page, key) => {
    if ((!page.oId && !page.absolutePath) || all) {
      list.push(key);
    }
    return list;
  }, []);
  if (!state.hsc.file || all) {
    ungivenPath.workspace = true;
  }
  return ungivenPath;
}

export function allDocumentsAreSaved(store, dispatch, cb) {
  if (!isSaveNeeded('workspace', store.getState())) {
    return cb(null);
  }
  return dialog.showMessageBox(
    BrowserWindow.getFocusedWindow(),
    {
      type: 'question',
      title: 'Opening new workspace',
      message: 'Workspace is modified. Do you want to save before closing ?',
      buttons: ['yes', 'no', 'cancel']
    }, (button) => {
      if (button === 2) { // cancel
        return cb('canceled');
      } else if (button === 0) { // yes
        if (getModifiedPagesIds(store.getState()).length > 0
          || getModifiedViewsIds(store.getState()).length > 0) {
          cb('Please, save the pages and views of this workspace');
        } else if (ungivenPaths().workspace) {
          getPathByFilePicker(store.getState().hsc.folder, 'workspace', 'save', (errWk, pathWk) => {
            if (errWk) {
              cb(errWk);
            }
            dispatch(updatePath(path.dirname(pathWk), path.basename(pathWk)));
            saveWorkspace(store.getState(), true, (err, winId) => {
              if (err) {
                cb(err);
              }
              dispatch(setModifiedWindow(winId, false));
              updateSavedWinTitle();
              cb(null);
            });
          });
        } else {
          cb(null);
        }
      } else {
        cb(null);
      }
    });
}

export function updateViewPath(viewId, store, dispatch, callback) {
  const state = store.getState();
  const view = state.views[viewId];
  getPathByFilePicker(state.hsc.folder, `View '${view.configuration.title}'`, 'save', (err, newViewPath) => {
    if (err) {
      callback(err, null);
    }
    dispatch(updateAbsViewPath(viewId, newViewPath));
    callback(null, viewId);
  });
}

export function updatePagePath(pageId, store, dispatch, callback) {
  const state = store.getState();
  const page = state.pages[pageId];
  getPathByFilePicker(state.hsc.folder, `Page '${page.title}'`, 'save', (err, newPagePath) => {
    if (err) {
      callback(err, null);
    }
    dispatch(updateAbsPagePath(pageId, newPagePath));
    callback(null, pageId);
  });
}

export function updateWorkspacePath(workspaceToSave, store, dispatch, callback) {
  if (workspaceToSave) {
    getPathByFilePicker(store.getState().hsc.folder, 'Workspace', 'save', (err, newWsPath) => {
      if (err) {
        return;
      }
      dispatch(updatePath(path.dirname(newWsPath), path.basename(newWsPath)));
      callback(null, workspaceToSave);
    });
  }
}


export function saveOneView(viewId, as = false) {
  const state = getStore().getState();
  if (as || (!state[viewId].oId && !state[viewId].path && state[viewId].absolutePath)) {
    saveView(state, viewId);
  } else {
    updateViewPath(viewId, getStore(), getStore().dispatch, (err, vId) => {
      if (err) {
        return;
      }
      saveView(getStore().getState(), vId, (errSave, id) => {
        if (errSave) {
          return;
        }
        getStore().dispatch(setModifiedView(id, false));
      });
    });
  }
}
