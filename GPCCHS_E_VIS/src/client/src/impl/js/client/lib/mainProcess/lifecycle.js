import { constants as globalConstants } from 'common';

import { updateStatus } from '../store/actions/hss';
import { updateStatus as updateAppStatus } from '../store/actions/hsc';
import { updateDomains } from '../store/actions/domains';
import convertFromStore from './vima/convertFromStore';
import { removeAllData } from '../store/actions/viewData';
import { removeAllRequests } from '../store/actions/dataRequests';
import { setActingOn, setActingOff } from '../mainProcess/storeObserver';
import { resetPreviousMap } from '../common/data/map/missingRemoteIds';

export const LIFECYCLE_NOT_STARTED = 'LIFECYCLE_NOT_STARTED';
export const LIFECYCLE_CONNECTED_WITH_HSS = 'LIFECYCLE_CONNECTED_WITH_HSS';
export const LIFECYCLE_READY = 'LIFECYCLE_READY';
export const LIFECYCLE_STARTED = 'LIFECYCLE_STARTED';

export function onOpen(dispatch, ws) {
  dispatch(updateStatus('main', 'connected'));
  ws.write({
    event: globalConstants.EVENT_IDENTITY,
    payload: {
      identity: 'main',
    },
  });
}

export function onAuthenticated(dispatch, ws) {
  dispatch(updateAppStatus(LIFECYCLE_CONNECTED_WITH_HSS));
  ws.write({ event: globalConstants.EVENT_DOMAIN_QUERY });
}

export function onDomainResponse(state, dispatch, ws, payload) {
  dispatch(updateDomains(payload));
  ws.write({
    event: globalConstants.EVENT_VIMA_TIMEBAR_INIT,
    payload: convertFromStore(state),
  });
}

export function onReady(dispatch) {
  dispatch(updateAppStatus(LIFECYCLE_READY));
}

export function onWindowOpened(dispatch) {
  dispatch(updateStatus(LIFECYCLE_STARTED));
}

export function onClose(dispatch) {
  setActingOn();
  dispatch(updateStatus('main', 'disconnected'));
  dispatch(removeAllRequests());
  dispatch(removeAllData());
  resetPreviousMap();
  // warning: timeout to handle a weird behavior that trigger data observer update
  setTimeout(setActingOff, 0);
}
