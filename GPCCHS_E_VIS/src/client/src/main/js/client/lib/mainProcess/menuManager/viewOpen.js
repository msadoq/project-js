import _ from 'lodash/fp';
import { v4 } from 'uuid';
import {
  LOG_DOCUMENT_OPEN,
} from 'common/constants';

import { server } from '../ipc';
import { readViews } from '../../common/documentManager';
import { getPathByFilePicker } from '../dialog';
import { add as addMessage } from '../../store/actions/messages';
import { addAndMount as addAndMountView } from '../../store/actions/pages';
import { getWindowFocusedPageId } from '../../store/selectors/windows';
import { getStore } from '../../store/mainStore';
import { getViewModule } from '../../viewManager';

const addDangerMessage = (focusedPageId, msg) => addMessage(focusedPageId, 'danger', msg);

function viewOpen(focusedWindow) {
  if (!focusedWindow) {
    return;
  }
  const { getState } = getStore();
  const state = getState();

  getPathByFilePicker(state.hsc.folder, 'view', 'open', (err, filePath) => {
    const viewPath = [{ absolutePath: filePath }];
    viewOpenWithPath({ windowId: focusedWindow.windowId, viewPath });
  });
}

function viewOpenWithPath({ windowId, viewPath }) {
  const { getState, dispatch } = getStore();
  const state = getState();
  const filePath = _.get([0, 'absolutePath'], viewPath);
  const focusedPage = state.windows[windowId].focusedPage;
  const focusedPageId = getWindowFocusedPageId(state, { windowId });

  readViews(viewPath, (errView, [view]) => {
    if (errView) {
      dispatch(addDangerMessage(focusedPageId, 'Unable to load View'));
      dispatch(addDangerMessage(focusedPageId, errView));
      return;
    }

    const viewId = v4();
    const layout = addViewInLayout(focusedPage, viewId);
    dispatch(addAndMountView(focusedPage, viewId, { ...view, absolutePath: filePath }, layout));
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'view', filePath);
  });
}

const addBlankView = type => focusedWindow => viewAddNew(focusedWindow, {
  type,
  configuration: getViewModule(type).prepareConfigurationForStore({}),
});

const addPlotView = addBlankView('PlotView');
const addTextView = addBlankView('TextView');
const addDynamicView = addBlankView('DynamicView');

function viewAddNew(focusedWindow, view) {
  const pageId = getStore().getState().windows[focusedWindow.windowId].focusedPage;
  const viewId = v4();
  getStore().dispatch(addAndMountView(pageId, viewId, view, addViewInLayout(pageId, viewId)));
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'view', `new ${_.getOr('view', 'type', view)}`);
}

function addViewInLayout(pageId, viewId) {
  if (!viewId) {
    return [];
  }
  if (!getStore().getState().pages[pageId]) {
    return [{ i: viewId, w: 5, h: 5, x: 0, y: 0 }];
  }
  return getStore().getState().pages[pageId].layout.concat({
    i: viewId, w: 5, h: 5, x: 0, y: 0,
  });
}

export default {
  viewOpen,
  viewOpenWithPath,
  addPlotView,
  addTextView,
  addDynamicView,
};
