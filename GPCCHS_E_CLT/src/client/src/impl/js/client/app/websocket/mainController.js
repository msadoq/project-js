import _ from 'lodash';
import debug from '../utils/mainDebug';
import { getStore } from '../store/mainStore';
import { updateStatus as updateAppStatus } from '../store/mutations/hscActions';
import { updateDomains } from '../store/mutations/domainsActions';
import updateFromTimebar from '../main/updateFromTimebar';


const logger = debug('main:controller');

export default function controller(event, payload) {
  switch (event) {
    case 'authenticated':
      logger.error('authenticated');
      break;
    case 'ready':
      getStore().dispatch(updateAppStatus('hss-ready'));
      break;
    case 'domainResponse':
      getStore().dispatch(updateDomains(payload));
      getStore().dispatch(updateAppStatus('domain-retrieved'));
      break;
    case 'timebarUpdate':
      updateFromTimebar(_.get(payload, 'uuid'), payload);
      break;
    default:
      logger.error('Received not yet implemented event', event);
  }
}
