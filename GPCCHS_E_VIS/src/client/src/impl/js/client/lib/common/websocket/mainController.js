import * as constants from '../../constants';
import debug from '../debug/mainDebug';
import updateStore from '../../mainProcess/vima/updateStore';
import { updateStatus as updateAppStatus } from '../../store/actions/hsc';
import { updateDomains } from '../../store/actions/domains';
import { getWebsocket } from './mainWebsocket';
import convertFromStore from '../../mainProcess/vima/convertFromStore';
import { importPayload } from '../../store/actions/dataCache';
import { setActingOn, setActingOff } from '../../mainProcess/storeObserver';

const logger = debug('main:controller');

export default function controller(state, dispatch, event, payload) {
  switch (event) {
    case 'authenticated':
      dispatch(updateAppStatus(constants.LIFECYCLE_CONNECTED_WITH_HSS));
      getWebsocket().write({ event: 'domainQuery' });
      break;
    case 'domainResponse':
      dispatch(updateDomains(payload));
      getWebsocket().write({
        event: 'vimaTimebarInit',
        payload: convertFromStore(state),
      });
      break;
    case 'ready':
      dispatch(updateAppStatus(constants.LIFECYCLE_READY));
      break;
    case 'timebarUpdate':
      updateStore(state, dispatch, payload);
      break;
    case 'timebasedData': {
      setActingOn();
      const start = process.hrtime();
      dispatch(importPayload(payload));
      const duration = process.hrtime(start)[1] / 1e6;
      const count = Object.keys(payload).length ? Object.keys(payload).length : 0;
      logger.debug(`data injection done in ${duration}ms, for ${count} remoteIds`);
      setActingOff();
      break;
    }
    case 'error':
      switch (payload.type) {
        case constants.ERRORTYPE_RESPONSE:
          logger.error('DC Response Error', payload.reason);
          break;
        default:
          logger.error('Unrecognized Error type');
          break;
      }
      break;
    default:
      logger.error('Received not yet implemented event', event);
  }
}
