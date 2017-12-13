import { LOG_DOCUMENT_OPEN } from 'constants';
import { addBlankPage } from 'store/actions/pages';
import { sendProductLog } from 'store/actions/hsc';
import { getStore } from '../store';

export default function pageAddBlank(focusedWindow) {
  getStore().dispatch(sendProductLog(LOG_DOCUMENT_OPEN, 'page', 'new page'));
  return getStore().dispatch(addBlankPage(focusedWindow.windowId));
}
