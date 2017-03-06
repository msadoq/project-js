import _ from 'lodash/fp';
import { v4 } from 'uuid';
import {
  LOG_DOCUMENT_OPEN,
} from 'common/constants';

import { server } from '../ipc';
import { loadViewInStore } from '../../documentManager/readView';
import { getPathByFilePicker } from '../dialog';
import { addAndMount as addAndMountView } from '../../store/actions/pages';
import { getWindowFocusedPageId } from '../../store/selectors/windows';
import { getStore } from '../../store/mainStore';
import { getViewModule } from '../../viewManager';

function viewOpen(focusedWindow) {
  if (!focusedWindow) {
    return;
  }
  const { getState } = getStore();
  const state = getState();

  getPathByFilePicker(state.hsc.folder, 'view', 'open', (err, absolutePath) => {
    viewOpenWithPath({ windowId: focusedWindow.windowId, absolutePath });
  });
}

function viewOpenWithPath({ windowId, absolutePath }) {
  const { dispatch, getState } = getStore();
  const pageUuid = getWindowFocusedPageId(getState(), { windowId });
  dispatch(loadViewInStore({ absolutePath, pageUuid }));
}

const addBlankView = (type, focusedWindow) => {
  const { dispatch, getState } = getStore();
  const view = { type, configuration: getViewModule(type).prepareConfigurationForStore({}) };
  const pageId = getState().windows[focusedWindow.windowId].focusedPage;
  const viewId = v4();
  dispatch(addAndMountView(pageId, viewId, view));
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'view', `new ${_.getOr('view', 'type', view)}`);
};

export default {
  viewOpen,
  viewOpenWithPath,
  addBlankView,
};
