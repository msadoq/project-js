import * as constants from '../../constants';
import debug from '../../common/debug/mainDebug';
import { getStatus as getAppStatus } from '../selectors/hsc';
import { updateStatus } from '../actions/hsc';

const logger = debug('store:observers:lifecycle');

export default function lifecycle(state, dispatch, previousState) {
  const lastKnownAppStatus = previousState
    ? getAppStatus(previousState)
    : null;

  const appStatus = getAppStatus(state);

  if (lastKnownAppStatus === appStatus) {
    return;
  }

  logger.info(`appStatus from ${lastKnownAppStatus} to ${appStatus}`);
}
