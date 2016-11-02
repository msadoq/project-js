import { constants as globalConstants } from 'common';

import debug from '../debug/mainDebug';
import updateStore from '../../mainProcess/vima/updateStore';
import injectData from '../data/inject';
import { setActingOn, setActingOff } from '../../mainProcess/storeObserver';
import { onAuthenticated, onDomainResponse, onReady } from '../../mainProcess/lifecycle';

const logger = debug('main:controller');

export default function controller(ws, state, dispatch, event, payload) {
  switch (event) {
    case globalConstants.EVENT_AUTHENTICATED:
      onAuthenticated(dispatch, ws);
      break;
    case globalConstants.EVENT_DOMAIN_RESPONSE:
      onDomainResponse(state, dispatch, ws, payload);
      break;
    case globalConstants.EVENT_READY:
      onReady(dispatch);
      break;
    case globalConstants.EVENT_TIMEBAR_UPDATE:
      updateStore(state, dispatch, payload);
      break;
    case globalConstants.EVENT_TIMEBASED_DATA: {
      // TODO : add a buffer queue management with .warn on increased delay
      setActingOn();
      injectData(state, dispatch, payload);
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
