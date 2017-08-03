import _ from 'lodash/fp';
import { v4 } from 'uuid';
import { LOG_DOCUMENT_OPEN } from '../../constants';

import { server } from '../ipc';
import { addBlankView } from '../../store/actions/views';
import { addBlankPage } from '../../store/actions/pages';
import { getWindowFocusedPageId } from '../../store/reducers/windows';
import { getStore } from '../store';
import { getViewModule } from '../../viewManager';

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
