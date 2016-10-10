import debug from '../debug/windowDebug';
import { getStore } from '../../store/windowStore';
import { updateStatus } from '../../store/actions/hss';

const logger = debug('window:controller');

export default function controller(windowId, event, payload) {
  switch (event) {
    case 'authenticated':
      getStore().dispatch(updateStatus(windowId, 'authenticated'));
      break;
    case 'timebasedData':
      logger.debug('timebasedData', payload);
      break;
    default:
      logger.error('Received not yet implemented event', event);
  }
}
