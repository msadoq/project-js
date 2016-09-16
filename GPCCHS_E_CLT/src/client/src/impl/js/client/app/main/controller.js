import debug from '../utils/debug';
import { getStore } from '../store/mainStore';
import { updateStatus as updateAppStatus } from '../store/mutations/hscActions';

const logger = debug('main:controller');

export default function controller(event, payload) {
  switch (event) {
    case 'ready':
      getStore().dispatch(updateAppStatus('hss-ready'));
      break;
    default:
      logger.error('Received not yet implemented event', event);
  }
}
