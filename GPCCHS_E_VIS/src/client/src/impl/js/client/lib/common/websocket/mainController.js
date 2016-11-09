
import globalConstants from 'common/constants';

import debug from '../debug/mainDebug';
import { receive } from '../../mainProcess/pull';
import updateStore from '../../mainProcess/vima/updateStore';
import { onAuthenticated, onDomainResponse, onReady } from '../../mainProcess/lifecycle';

const logger = debug('main:controller');

export default function controller(ws, state, dispatch, event, payload) {
  switch (event) {
    case globalConstants.EVENT_AUTHENTICATED:
      return onAuthenticated(dispatch, ws);
    case globalConstants.EVENT_DOMAIN_RESPONSE:
      return onDomainResponse(state, dispatch, ws, payload);
    case globalConstants.EVENT_READY:
      return onReady(dispatch);
    case globalConstants.EVENT_TIMEBAR_UPDATE:
      return updateStore(state, dispatch, payload);
    case globalConstants.EVENT_TIMEBASED_DATA:
      return receive(state, dispatch, payload);
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
