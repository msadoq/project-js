import { v4 } from 'node-uuid';

import { readViews } from '../../documentsManager/extractViews';
import { showErrorMessage, getPathByFilePicker } from '../dialog';
import { addAndMount as addAndMountView } from '../../store/actions/pages';
import { getStore } from '../../store/mainStore';
import { setModified as setModifiedView } from '../../store/actions/views';

module.exports = { viewOpen, addPlotView, addTextView, addDynamicView };


function viewOpen(focusedWindow) { // absolutePath, pageId) {
  if (!focusedWindow) {
    return;
  }

  const state = getStore().getState();
  getPathByFilePicker(state.hsc.folder, 'view', 'open', (err, filePath) => {
    if (err || !filePath) { // error or cancel
      return;
    }
    const viewPath = [{ absolutePath: filePath }];
    readViews(viewPath, (errView, view) => {
      if (errView) {
        showErrorMessage(focusedWindow,
          'Error on selected view',
          'Invalid View file selected'.concat(errView), () => {});
        return;
      }
      const current = view[0];
      current.absolutePath = filePath;
      showSelectedView(current, state.windows[focusedWindow.windowId].focusedPage);
    });
  });
}

function addPlotView(focusedWindow) {
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
  viewAddNew(focusedWindow, view);
}

function addTextView(focusedWindow) {
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
  viewAddNew(focusedWindow, view);
}
function addDynamicView(focusedWindow) {
  const view = {
    type: 'DynamicView',
    configuration: {
      type: 'DynamicView',
      defaultRatio: { length: 5, width: 5 },
      entryPoint: undefined,
      links: [],
      title: 'New Dynamic View',
    } };
  viewAddNew(focusedWindow, view);
}
function viewAddNew(focusedWindow, view) {
  const pageId = getStore().getState().windows[focusedWindow.windowId].focusedPage;
  const viewId = v4();
  getStore().dispatch(addAndMountView(pageId, viewId, view, addViewInLayout(pageId, viewId)));
  getStore().dispatch(setModifiedView(viewId, true));
}


function showSelectedView(view, pageId) {
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
