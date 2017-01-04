import _map from 'lodash/map';
import { v4 } from 'node-uuid';
import { readPages } from '../../documentsManager/extractPages';
import { showErrorMessage } from '../dialog';
import { extractViews } from '../../documentsManager/extractViews';
import { requestPathFromOId } from '../websocket';
import { getStore } from '../../store/mainStore';
import { add as addView } from '../../store/actions/views';
import { addAndMount as addAndMountPage } from '../../store/actions/windows';
import { setModified as setModifiedPage } from '../../store/actions/pages';
import getPathByFilePicker from '../filePicker';

module.exports = { pageOpen, pageAddNew };

function pageOpen(focusedWindow) {
  if (!focusedWindow) {
    return;
  }
  getPathByFilePicker(getStore().getState().hsc.folder, 'page', 'open', (err, filePath) => {
    if (err || !filePath) { // error or cancel
      return;
    }

    readPages(undefined, [{ absolutePath: filePath }], requestPathFromOId, (pageErr, pages) => {
      if (pageErr) {
        return showErrorMessage(focusedWindow,
          'Error on selected page',
          'Invalid Page file selected', () => {});
      }
      const content = { pages: {} };
      const uuid = v4();
      content.pages[uuid] = pages[0];
      extractViews(content, requestPathFromOId, (viewErr, pageAndViews) => {
        if (viewErr) {
          return showErrorMessage(focusedWindow,
            'Error on selected page',
            'Invalid view in selected page file', () => {});
        }
        showSelectedPage(pageAndViews, uuid, focusedWindow.windowId);
        const title = getStore().getState().windows[focusedWindow.windowId].title;
        focusedWindow.setTitle(title.concat(' * - VIMA'));
      });
    });
  });
}

function pageAddNew(focusedWindow) {
  if (!focusedWindow) {
    return;
  }
  const uuid = v4();
  getStore().dispatch(addAndMountPage(focusedWindow.windowId, uuid));
  getStore().dispatch(setModifiedPage(uuid, true));
  const title = getStore().getState().windows[focusedWindow.windowId].title;
  focusedWindow.setTitle(title.concat(' * - VIMA'));
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
