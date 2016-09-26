import debug from '../utils/debug';
import { getStore } from '../store/mainStore';
import { updateStatus as updateAppStatus } from '../store/mutations/hscActions';
import { updateDomains } from '../store/mutations/domainsActions';

const logger = debug('main:controller');

export default function controller(event, payload) {
  switch (event) {
    case 'authenticated':
      logger.error('authenticated');
      // TODO do something here ?
      break;
    case 'ready':
      getStore().dispatch(updateAppStatus('hss-ready'));
      break;
    case 'domainResponse':
      getStore().dispatch(updateDomains(payload));
      getStore().dispatch(updateAppStatus('domain-retrieved'));
      break;
    default:
      logger.error('Received not yet implemented event', event);
  }
}
