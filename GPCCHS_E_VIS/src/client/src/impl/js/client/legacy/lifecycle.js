import * as constants from '../lib/constants';
import debug from '../lib/common/debug/mainDebug';
import { getStatus as getAppStatus } from '../lib/store/selectors/hsc';
import { updateStatus } from '../lib/store/actions/hsc';

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
