import * as constants from '../constants';
import debug from '../common/debug/mainDebug';
import { getStatus as getAppStatus } from '../store/selectors/hsc';
import { updateStatus } from '../store/actions/hsc';
import { getStore } from '../store/mainStore';
import requestData from '../common/data/request';
import windowsObserver from './windows/observer';

const logger = debug('mainProcess:storeObserver');

let lastKnownAppStatus = null;
let windowAlreadyOpened = false;
let actingOnData = false;

export const setActingOn = () => (actingOnData = true);
export const setActingOff = () => (actingOnData = false);
export const isActing = () => actingOnData;

export default function storeObserver() {
  logger.verbose('storeObserver called');
  const store = getStore();
  const state = store.getState();
  const dispatch = store.dispatch;

  // lifecycle new step
  const appStatus = getAppStatus(state);
  if (lastKnownAppStatus !== appStatus) {
    logger.info(`appStatus from ${lastKnownAppStatus} to ${appStatus}`);
    lastKnownAppStatus = appStatus;
  }

  // sync windows only if app is ready or started
  if (getAppStatus(state) === constants.LIFECYCLE_READY
    || getAppStatus(state) === constants.LIFECYCLE_STARTED) {
    logger.debug('windows synchronization');
    windowsObserver(state, (err) => {
      if (err) {
        logger.error(err);
      }

      // only one time to avoid infinite recursion
      if (windowAlreadyOpened === false) {
        windowAlreadyOpened = true;
        dispatch(updateStatus(constants.LIFECYCLE_STARTED));
      }
    });
  }

  // data sync is done only if windows was opened at least one time and if dispatched action not
  // come from requestData()
  if (windowAlreadyOpened === true && !isActing()) {
    setActingOn();
    requestData(state, dispatch);
    setTimeout(setActingOff, 0); // timeout added to avoid data observer update
  }
}
