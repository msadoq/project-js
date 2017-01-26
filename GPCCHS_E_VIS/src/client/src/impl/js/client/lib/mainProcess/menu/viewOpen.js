import _ from 'lodash/fp';
import { v4 } from 'node-uuid';
import {
  LOG_DOCUMENT_OPEN
} from 'common/constants';

import { server } from '../ipc';
import { readViews } from '../../common/documentManager';
import { getPathByFilePicker } from '../dialog';
import { add as addMessage } from '../../store/actions/messages';
import { addAndMount as addAndMountView } from '../../store/actions/pages';
import { getWindowFocusedPageId } from '../../store/selectors/windows';
import { getStore } from '../../store/mainStore';
import { setModified as setModifiedView } from '../../store/actions/views';

module.exports = { viewOpen, addPlotView, addTextView, addDynamicView };

function viewOpen(focusedWindow) { // absolutePath, pageId) {
  if (!focusedWindow) {
    return;
  }

  const { getState, dispatch } = getStore();
  const state = getState();

  const focusedPageId = getWindowFocusedPageId(state, focusedWindow.windowId);
  const addDangerMessage = msg => dispatch(addMessage(focusedPageId, 'danger', msg));

  getPathByFilePicker(state.hsc.folder, 'view', 'open', (err, filePath) => {
    const viewPath = [{ absolutePath: filePath }];
    readViews(viewPath, (errView, view) => {
      if (errView) {
        addDangerMessage('Unable to load View');
        addDangerMessage(errView);
        return;
      }
      const current = view[0];
      current.absolutePath = filePath;
      showSelectedView(current, state.windows[focusedWindow.windowId].focusedPage);
      server.sendProductLog(LOG_DOCUMENT_OPEN, 'view', filePath);
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
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'view', `new ${_.getOr('view', 'type', view)}`);
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
