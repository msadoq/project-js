import { v4 } from 'uuid';
import {
  LOG_DOCUMENT_OPEN,
} from 'common/constants';
import { server } from '../ipc';
import { getPathByFilePicker } from '../dialog';
import { getStore } from '../../store/mainStore';
import { add as addMessage } from '../../store/actions/messages';
import { addAndMount as addAndMountPage } from '../../store/actions/windows';

import { loadPageInStore } from '../../documentManager/readPage';

const addGlobalError = msg => addMessage('global', 'danger', msg);

const pageOpenWithPath = ({ filePath, windowId }) => {
  getStore().dispatch(loadPageInStore({ absolutePath: filePath, windowId }));
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

function pageAddNew(focusedWindow) {
  const { dispatch, getState } = getStore();
  if (!focusedWindow) {
    dispatch(addGlobalError('Saving failed : no window focused'));
    return;
  }
  const uuid = v4();
  dispatch(addAndMountPage(focusedWindow.windowId, uuid));
  const title = getState().windows[focusedWindow.windowId].title;
  focusedWindow.setTitle(title.concat(' * - VIMA')); // Todo savableMiddleware
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'page', 'new page');
}

export default {
  pageOpen,
  pageOpenWithPath,
  pageAddNew,
};
