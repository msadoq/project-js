
import globalConstants from 'common/constants';
import debug from '../debug/windowDebug';
import { updateStatus } from '../../store/actions/hss';

const logger = debug('window:controller');

export default function controller(state, dispatch, windowId, event, /* payload */) {
  switch (event) {
    case globalConstants.EVENT_AUTHENTICATED:
      dispatch(updateStatus(windowId, 'authenticated'));
      break;
    default:
      logger.error('Received not yet implemented event', event);
  }
}
