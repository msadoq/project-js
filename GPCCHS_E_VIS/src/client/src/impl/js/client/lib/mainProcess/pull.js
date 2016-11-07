import { constants as globalConstants } from 'common';
import { getWebsocket } from '../common/websocket/mainWebsocket';
import inject from '../common/data/inject';
import { setActingOn, setActingOff } from './storeObserver';

let timeout = null;

export function ask() {
  getWebsocket().write({ event: globalConstants.EVENT_PULL });
}

export function receive(state, dispatch, payload) {
  clear(); // precaution

  // TODO : look for time and .warn on increased delay between two loop (caution: server doesn't
  //        send if no new data)
  setActingOn();
  inject(state, dispatch, payload);
  setActingOff();

  schedule();
}

export function schedule() {
  if (timeout !== null) {
    return;
  }

  timeout = setTimeout(ask, globalConstants.HSC_PULL_FREQUENCY);
}

export function clear() {
  if (timeout === null) {
    return;
  }

  clearTimeout(timeout);
  timeout = null;
}
