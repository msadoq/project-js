import { BrowserWindow } from 'electron';
import _map from 'lodash/map';
import { v4 } from 'uuid';
import {
  LOG_DOCUMENT_OPEN,
} from 'common/constants';
import { server } from '../ipc';
import { readPages, extractViews } from '../../common/documentManager';
import { getPathByFilePicker } from '../dialog';
import { getStore } from '../../store/mainStore';
import { add as addView } from '../../store/actions/views';
import { add as addMessage } from '../../store/actions/messages';
import { addAndMount as addAndMountPage } from '../../store/actions/windows';
import { setModified as setModifiedPage } from '../../store/actions/pages';

const addGlobalError = msg => addMessage('global', 'danger', msg);

function pageOpen(focusedWindow) {
  const store = getStore();
  if (!focusedWindow) {
    return;
  }
  getPathByFilePicker(store.getState().hsc.folder, 'page', 'open', (err, filePath) => {
    if (err || !filePath) { // error or cancel
      return;
    }
    pageOpenWithPath({ filePath, windowId: focusedWindow.windowId });
  });
}

function pageOpenWithPath({ filePath, windowId }) {
  const store = getStore();
  readPages(undefined, [{ absolutePath: filePath }], (pageErr, pages) => {
    if (pageErr) {
      store.dispatch(addGlobalError('Unable to load page'));
      store.dispatch(addGlobalError(pageErr));
    }
    const content = { pages: {} };
    const uuid = v4();
    content.pages[uuid] = pages[0];
    extractViews(content, (viewErr, pageAndViews) => {
      if (viewErr) {
        store.dispatch(addGlobalError('Unable to load page : invalid view'));
        store.dispatch(addGlobalError(viewErr));
      }
      showSelectedPage(pageAndViews, uuid, windowId);
      const title = store.getState().windows[windowId].title;
      const window = BrowserWindow.getFocusedWindow();
      window.setTitle(title.concat(' * - VIMA'));
      server.sendProductLog(LOG_DOCUMENT_OPEN, 'page', filePath);
    });
  });
}

function pageAddNew(focusedWindow) {
  if (!focusedWindow) {
    return getStore().dispatch(addGlobalError('Saving failed : no window focused'));
  }
  const { dispatch, getState } = getStore();
  const uuid = v4();
  dispatch(addAndMountPage(focusedWindow.windowId, uuid));
  dispatch(setModifiedPage(uuid, true));
  const title = getState().windows[focusedWindow.windowId].title;
  focusedWindow.setTitle(title.concat(' * - VIMA'));
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'page', 'new page');
}

function showSelectedPage(pageAndViews, pageId, windowId) {
  const store = getStore();
  const layout = _map(pageAndViews.views, v => ({
    i: v.uuid,
    x: v.geometry.x,
    y: v.geometry.y,
    w: v.geometry.w,
    h: v.geometry.h,
    maxH: v.geometry.maxH || 100,
    maxW: v.geometry.maxW || 100,
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
  page.isModified = false;
  store.dispatch(addAndMountPage(windowId, pageId, page));
}

export default {
  pageOpen,
  pageOpenWithPath,
  pageAddNew,
};
