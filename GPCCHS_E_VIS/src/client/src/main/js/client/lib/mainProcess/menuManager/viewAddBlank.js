// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean menuManager . . .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess + replace old IPC productLog
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { v4 } from 'uuid';
import { LOG_DOCUMENT_OPEN } from 'constants';

import { addBlankView } from 'store/actions/views';
import { addBlankPage } from 'store/actions/pages';
import { getWindowFocusedPageId } from 'store/reducers/windows';
import { getViewModule } from 'viewManager';
import { server } from '../ipc';
import { getStore } from '../store';

const viewAddBlank = (type, focusedWindow) => {
  const { dispatch, getState } = getStore();
  const { windowId } = focusedWindow;
  const focusedPageId = getWindowFocusedPageId(getState(), { windowId });
  const pageId = focusedPageId || v4();
  const view = getViewModule(type).prepareViewForStore({
    type,
    uuid: v4(),
  });
  if (!focusedPageId) {
    dispatch(addBlankPage(focusedWindow.windowId, pageId));
  }
  dispatch(addBlankView(view, pageId));
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'view', `new ${_.get('type', view)}`);
};

export default viewAddBlank;
