import _ from 'lodash';
import * as constants from '../../constants';
import debug from '../debug/mainDebug';
import { getStore } from '../../store/mainStore';
import updateStore from '../../mainProcess/vima/updateStore';
import { updateStatus as updateAppStatus } from '../../store/actions/hsc';
import { updateDomains } from '../../store/actions/domains';
import { getWebsocket } from './mainWebsocket';
import convertFromStore from '../../mainProcess/vima/convertFromStore';
import importPayload from '../../store/actions/dataCache';

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
    case 'timebasedData': {
      console.log('timebasedData', payload);
      const state = store.getState();
      console.log(state);
      store.dispatch(
        _.get(state, 'dataCache'),
        importPayload(payload),
        _.get(state, 'dataRequests'),
        _.get(state, 'timebars')
      );
      break;
    }
    default:
      logger.error('Received not yet implemented event', event);
  }
}
