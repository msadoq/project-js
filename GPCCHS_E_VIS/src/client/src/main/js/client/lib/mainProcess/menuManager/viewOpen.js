import _ from 'lodash/fp';
import { v4 } from 'uuid';
import {
  LOG_DOCUMENT_OPEN,
} from 'common/constants';

import { server } from '../ipc';
import { openView } from '../../documentManager';
import { getPathByFilePicker } from '../dialog';
import { addBlankView } from '../../store/actions/views';
import { addBlankPage } from '../../store/actions/pages';
import { getWindowFocusedPageId } from '../../store/reducers/windows';
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
  const focusedPageId = getWindowFocusedPageId(getState(), { windowId });
  const pageId = focusedPageId || v4();
  const viewInfo = { absolutePath };
  if (!focusedPageId) {
    dispatch(addBlankPage(windowId, pageId));
  }
  dispatch(openView(viewInfo, pageId));
}

const viewAddBlank = (type, focusedWindow) => {
  const { dispatch, getState } = getStore();
  const focusedPageId = getState().windows[focusedWindow.windowId].focusedPage;
  const pageId = focusedPageId || v4();
  const view = {
    type,
    configuration: getViewModule(type).prepareConfigurationForStore({}),
    uuid: v4(),
  };
  if (!focusedPageId) {
    dispatch(addBlankPage(focusedWindow.windowId, pageId));
  }
  dispatch(addBlankView(view, pageId));
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'view', `new ${_.get('type', view)}`);
};

export default {
  viewOpen,
  viewOpenWithPath,
  viewAddBlank,
};
