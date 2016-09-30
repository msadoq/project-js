import _ from 'lodash';
import debug from '../utils/mainDebug';
import { getStore } from '../store/mainStore';
import { updateStatus as updateAppStatus } from '../store/mutations/hscActions';
import { updateDomains } from '../store/mutations/domainsActions';
import updateFromVimaTimebar from '../main/updateFromVimaTimebar';
import { getWebsocket } from '../websocket/mainWebsocket';

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
    case 'vimaTimebarUpdate':
      updateFromVimaTimebar(_.get(payload, 'uuid'), payload);
      // Send tb update to hss
      const state = getStore().getState();
      getWebsocket().write({
        event: 'timebarUpdate',
        payload: { timebars: state.timebars, timelines: state.timelines },
      });    
      break;
    default:
      logger.error('Received not yet implemented event', event);
  }
}
