// import { v4 } from 'uuid';
import {
  LOG_DOCUMENT_OPEN,
} from 'common/constants';
import { server } from '../ipc';
import { getPathByFilePicker } from '../dialog';
import { getStore } from '../../store/mainStore';
import { addBlankPage } from '../../store/actions/pages';

import { openPage } from '../../documentManager/actions';

const pageOpenWithPath = ({ filePath, windowId }) => {
  getStore().dispatch(openPage({ absolutePath: filePath, windowId }));
};

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

function pageAddBlank(focusedWindow) {
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'page', 'new page');
  return getStore().dispatch(addBlankPage(focusedWindow.windowId));
}

export default {
  pageOpen,
  pageOpenWithPath,
  pageAddBlank,
};
