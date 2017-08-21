import { LOG_DOCUMENT_OPEN } from '../../constants';
import { getStore } from '../store';
import { addBlankPage } from '../../store/actions/pages';
import { sendProductLog } from '../../store/actions/hsc';

export default function pageAddBlank(focusedWindow) {
  getStore().dispatch(sendProductLog(LOG_DOCUMENT_OPEN, 'page', 'new page'));
  return getStore().dispatch(addBlankPage(focusedWindow.windowId));
}
