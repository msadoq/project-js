import { constants as globalConstants } from 'common';
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
    case globalConstants.EVENT_AUTHENTICATED:
      dispatch(updateAppStatus(constants.LIFECYCLE_CONNECTED_WITH_HSS));
      getWebsocket().write({ event: globalConstants.EVENT_DOMAIN_QUERY });
      break;
    case globalConstants.EVENT_DOMAIN_RESPONSE:
      dispatch(updateDomains(payload));
      getWebsocket().write({
        event: globalConstants.EVENT_VIMA_TIMEBAR_INIT,
        payload: convertFromStore(state),
      });
      break;
    case globalConstants.EVENT_READY:
      dispatch(updateAppStatus(constants.LIFECYCLE_READY));
      break;
    case globalConstants.EVENT_TIMEBAR_UPDATE:
      updateStore(state, dispatch, payload);
      break;
    case globalConstants.EVENT_TIMEBASED_DATA: {
      // TODO : add a buffer queue management with .warn on increased delay
      setActingOn();
      const start = process.hrtime();
      dispatch(importPayload(payload));
      const duration = process.hrtime(start)[1] / 1e6;
      const count = Object.keys(payload).length ? Object.keys(payload).length : 0;
      if (duration > 10) {
        logger.warn(`data injection done in ${duration}ms, for ${count} remoteIds`);
      } else {
        logger.debug(`data injection done in ${duration}ms, for ${count} remoteIds`);
      }
      setActingOff();
      break;
    }
    case globalConstants.EVENT_ERROR:
      switch (payload.type) {
        case globalConstants.ERRORTYPE_RESPONSE:
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
