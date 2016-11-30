import { LIFECYCLE_STARTED } from 'common/constants';
import getLogger from 'common/log';

import { getStatus } from '../store/selectors/hsc';
import { onStarted } from './lifecycle';

const logger = getLogger('GPCCHS:mainProcess:storeObserver');

let lastKnownAppStatus = null;

export default function storeObserver(store) {
  const state = store.getState();

  // new lifecycle step
  const appStatus = getStatus(state);
  if (lastKnownAppStatus !== appStatus) {
    logger.info(`appStatus from ${lastKnownAppStatus} to ${appStatus}`);

    if (appStatus === LIFECYCLE_STARTED) {
      onStarted();
    }

    lastKnownAppStatus = appStatus;
  }
}
