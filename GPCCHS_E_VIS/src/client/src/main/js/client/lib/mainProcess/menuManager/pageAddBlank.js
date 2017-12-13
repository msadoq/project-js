// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Remove pageOpen and pageSave in menuManager, add pageAddBlank
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess + replace old IPC productLog
// END-HISTORY
// ====================================================================

import { LOG_DOCUMENT_OPEN } from 'constants';
import { addBlankPage } from 'store/actions/pages';
import { sendProductLog } from 'store/actions/hsc';
import { getStore } from '../store';

export default function pageAddBlank(focusedWindow) {
  getStore().dispatch(sendProductLog(LOG_DOCUMENT_OPEN, 'page', 'new page'));
  return getStore().dispatch(addBlankPage(focusedWindow.windowId));
}
