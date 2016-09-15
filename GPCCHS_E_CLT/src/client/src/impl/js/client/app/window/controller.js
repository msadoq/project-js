import debug from '../utils/debug';
import { getStore } from '../store/windowStore';
import { updateStatus } from '../store/mutations/hssActions';

const logger = debug('window:controller');

export default function controller(windowId, event, payload) {
  switch (event) {
    case 'authenticated':
      console.log('authenticated')
      getStore().dispatch(updateStatus(windowId, 'authenticated'));
      break;
    default:
      logger.error('Received not yet implemented event', event);
  }
}
