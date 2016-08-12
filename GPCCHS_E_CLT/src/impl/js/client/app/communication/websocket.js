import debug from 'debug';
import _ from 'lodash';
import sio from 'socket.io-client';
import { websocketStatus } from '../actions/websocket';
import { addPoints } from '../actions/plots';
import { init as stubInit } from './websocket-stub';

const logger = debug('gpcchs_e_clt:client:communication:websocket');

let socket = null;

export function connect(store) {
  if (isConnected()) {
    socket.disconnect();
  }

  socket = sio.connect('http://localhost:1337', { // TODO : URL in env
    reconnection: true,
    reconnectionDelay: 250,
    reconnectionDelayMax: 750,
    timeout: 20000,
    multiplex: false,
    transports: ['websocket'],
    forceNew: true,
    query: 'device=our_secure_token', // TODO
  });

  const handleStatusChange = (status, err) => {
    logger('socket status changed to', status, err);
    store.dispatch(websocketStatus(status, err));
  };
  socket.on('connect', () => handleStatusChange('connect'));
  socket.on('connect_error', err => handleStatusChange('connect_error', err));
  socket.on('connect_timeout', () => handleStatusChange('connect_timeout'));
  socket.on('reconnect', () => handleStatusChange('reconnect'));
  socket.on('reconnect_attempt', () => handleStatusChange('reconnect_attempt'));
  socket.on('reconnecting', () => handleStatusChange('reconnecting'));
  socket.on('reconnect_error', err => handleStatusChange('reconnect_error', err));
  socket.on('reconnect_failed', () => handleStatusChange('reconnect_failed'));

  const findViewInStore = (subscriptionId, callback) => {
    const viewId = _.findKey(
      store.getState().views,
      v => v.subscriptions.indexOf(subscriptionId) !== -1
    );
    if (!viewId) {
      return logger('plot error, unable to find view for subscription', subscriptionId);
    }
    callback(null, viewId);
  };

  const receivePoints = payload => {
    if (store.getState().subscriptions.waiting > 0) {
      setTimeout(() => receivePoints(payload), 0);
    } else {
      logger('plot', payload);
      findViewInStore(payload.subscriptionId,
        (err, viewId) => store.dispatch(addPoints(viewId, payload.subscriptionId, payload.points)));
    }
  };

  stubInit(receivePoints);
  socket.on('plot', receivePoints);
  socket.on('timeline', payload => {
    logger('timeline', payload);
  });
}

export function disconnect() {
  if (!socket) {
    return;
  }

  socket.disconnect();
  socket = null;
}

export function isConnected() {
  return (socket && socket.connected === true);
}

export function getSocket() {
  return socket;
}
