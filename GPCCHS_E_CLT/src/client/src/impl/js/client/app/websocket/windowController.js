import debug from '../utils/windowDebug';
import { getStore } from '../store/windowStore';
import { updateStatus } from '../store/mutations/hssActions';

const logger = debug('window:controller');

export default function controller(windowId, event, payload) {
  switch (event) {
    case 'authenticated':
      getStore().dispatch(updateStatus(windowId, 'authenticated'));
      break;
    case 'newData':
      logger.debug('newData');
      logger.debug(payload);
      break;
    default:
      logger.error('Received not yet implemented event', event);
  }
}
