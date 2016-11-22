import _map from 'lodash/map';
import _find from 'lodash/findIndex';
import _reduce from 'lodash/reduce';
import { v4 } from 'node-uuid';
import path from 'path';
import { dialog, BrowserWindow } from 'electron';

import {
  addAndMount as addAndMountView,
  updateAbsolutePath as updateAbsPagePath
} from '../store/actions/pages';
import { addAndMount as addAndMountPage } from '../store/actions/windows';
import { add as addView, updateAbsolutePath as updateAbsViewPath } from '../store/actions/views';
import { updatePath } from '../store/actions/hsc';
import { extractViews, readViews } from '../documentsManager/extractViews';
import { readPages } from '../documentsManager/extractPages';
import { getStore } from '../store/mainStore';
import getPathByFilePicker from './filePicker';
import { saveAllDocuments } from '../documentsManager/saveAllDocuments';


const WORKSPACE = 'workspace';
const PAGE = 'page';
const VIEW = 'view';

export function openPage(absolutePath, windowId) {
  if (!absolutePath) {
    return;
  }
  const uuid = v4();
  const pageToRead = [{ absolutePath }];
  readPages(undefined, pageToRead, (pageErr, pages) => {
    if (pageErr) {
      // logger.error(pageErr);
      dialog.showMessageBox(
        BrowserWindow.getFocusedWindow(),
        {
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
        dialog.showMessageBox(
          BrowserWindow.getFocusedWindow(),
          {
            type: 'error',
            title: 'Error on selected page',
            message: `Invalid views on selected Page ${viewErr}`,
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


export function openView(absolutePath, pageId) {
  if (!absolutePath) {
    return;
  }
  const viewPath = [{ absolutePath }];

  readViews(viewPath, (err, view) => {
    if (err) {
      dialog.showMessageBox(
        BrowserWindow.getFocusedWindow(),
        {
          type: 'error',
          title: 'Error on selected view',
          message: `Invalid view. ${err}`,
          buttons: ['ok']
        });
      return;
    }
    const current = view[0];
    current.absolutePath = absolutePath; // viewPath;
    showSelectedView(current, pageId);
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
}


function showSelectedView(view, pageId) {
  const viewId = v4();
  getStore().dispatch(addAndMountView(pageId, viewId, view, addViewInLayout(pageId, viewId)));
}

export function addNewView(focusedWindow, view) {
  const pageId = getStore().getState().windows[focusedWindow.windowId].focusedPage;
  const viewId = v4();
  getStore().dispatch(addAndMountView(pageId, viewId, view, addViewInLayout(pageId, viewId)));
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
  switch (type) {
    case WORKSPACE:
      if (_find(state.windows, 'isModified')) {
        return true;
      }
    case PAGE: // eslint-disable-line no-fallthrough
      if (_find(state.pages, 'isModified')) {
        return true;
      }
    case VIEW: // eslint-disable-line no-fallthrough
      if (_find(state.views, 'isModified')) {
        return true;
      }
    default: // eslint-disable-line no-fallthrough
      return false;
  }
}

// returns if all documents have a path or an oId given
export function ungivenPaths() {
  const state = getStore().getState();
  const ungivenPath = { workspace: false };
  ungivenPath.views = _reduce(state.views, (list, view, key) => {
    if (!view.oId && !view.absolutePath) {
      list.push(key);
    }
    return list;
  }, []);
  ungivenPath.pages = _reduce(state.pages, (list, page, key) => {
    if (!page.oId && !page.absolutePath) {
      list.push(key);
    }
    return list;
  }, []);
  if (!state.hsc.folder || state.hsc.path) {
    ungivenPath.workspace = true;
  }
  return ungivenPath;
}

export function allDocumentsAreSaved(state, dispatch) {
  if (!isSaveNeeded('workspace', state)) {
    return true;
  }
  const button = dialog.showMessageBox(
    BrowserWindow.getFocusedWindow(),
    {
      type: 'question',
      title: 'Opening new workspace',
      message: 'Workspace is modified. Do you want to save before closing ?',
      buttons: ['yes', 'no', 'cancel']
    });
  if (button === 2) { // cancel
    return false;
  }
  if (button === 0) { // yes
    const idToSave = ungivenPaths();
    // views
    idToSave.views.forEach((viewId) => {
      const pathView = getPathByFilePicker(state.hsc.folder, 'view', 'save');
      if (!pathView) {
        return false;
      }
      dispatch(updateAbsViewPath(viewId, pathView));
    });
    // pages
    idToSave.pages.forEach((pageId) => {
      const pathPage = getPathByFilePicker(state.hsc.folder, 'page', 'save');
      if (!pathPage) {
        return false;
      }
      dispatch(updateAbsPagePath(pageId, pathPage));
    });
    // windows
    if (idToSave.workspace) {
      const pathWk = getPathByFilePicker(state.hsc.folder, 'workspace', 'save');
      if (!pathWk) {
        return false;
      }
      dispatch(updatePath(path.dirname(pathWk), path.basename(pathWk)));
    }
    saveAllDocuments(state);
  }
  return true;
}
