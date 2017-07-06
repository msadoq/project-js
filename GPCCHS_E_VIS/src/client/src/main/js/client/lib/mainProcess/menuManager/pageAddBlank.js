import { LOG_DOCUMENT_OPEN } from '../../constants';
import { server } from '../ipc';
import { getStore } from '../store';
import { addBlankPage } from '../../store/actions/pages';

export default function pageAddBlank(focusedWindow) {
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'page', 'new page');
  return getStore().dispatch(addBlankPage(focusedWindow.windowId));
}
