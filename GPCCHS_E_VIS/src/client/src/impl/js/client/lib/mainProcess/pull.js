import _isObject from 'lodash/isObject';

import globalConstants from 'common/constants';

import { getWebsocket } from './websocket';
import inject from '../dataManager/inject';
import { setActingOn, setActingOff } from './storeObserver';

let timeout = null;

export function ask() {
  getWebsocket().write({ event: globalConstants.EVENT_PULL });
}

export function receive(state, dispatch, payload) {
  clear(); // concurrency issue precaution

  if (_isObject(payload) && Object.keys(payload).length) {
    // TODO : look for time and .warn on increased delay between two loop
    setActingOn();
    inject(state, dispatch, payload);
    setActingOff();
  }

  schedule();
}

export function schedule() {
  if (timeout !== null) {
    return;
  }

  // never trigger a new one until previous was received and injected
  timeout = setTimeout(ask, globalConstants.HSC_PULL_FREQUENCY);
}

export function clear() {
  if (timeout === null) {
    return;
  }

  clearTimeout(timeout);
  timeout = null;
}
