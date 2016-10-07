import _ from 'lodash';
import * as constants from '../constants';
import debug from '../utils/mainDebug';
import { getStore } from '../store/mainStore';
import { updateStatus as updateAppStatus } from '../store/mutations/hscActions';
import { updateDomains } from '../store/mutations/domainsActions';
import updateStore from '../main/vima/updateStore';
import { getWebsocket } from '../websocket/mainWebsocket';
import convertFromStore from '../main/vima/convertFromStore';

const logger = debug('main:controller');

export default function controller(event, payload) {
  const store = getStore();
  switch (event) {
    case 'authenticated':
      store.dispatch(updateAppStatus(constants.LIFECYCLE_CONNECTED_WITH_HSS));
      getWebsocket().write({ event: 'domainQuery' });
      break;
    case 'domainResponse':
      store.dispatch(updateDomains(payload));
      getWebsocket().write({
        event: 'vimaTimebarInit',
        payload: convertFromStore(getStore().getState()),
      });
      break;
    case 'ready':
      store.dispatch(updateAppStatus(constants.LIFECYCLE_STARTED));
      break;
    case 'timebarUpdate':
      updateStore(store.getState(), store.dispatch, payload);
      break;
    case 'newData':
      console.log('newData', payload);
      break;
    default:
      logger.error('Received not yet implemented event', event);
  }
}
