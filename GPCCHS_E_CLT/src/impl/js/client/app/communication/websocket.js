import debug from 'debug';
import sio from 'socket.io-client';
import { websocketStatus } from '../actions/websocket';
import { addPoints } from '../actions/subscriptions';

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

  socket.on('plot', payload => {
    logger('plot', payload);
    store.dispatch(addPoints(payload.subscriptionId, [{
      x: payload.data[0],
      y: payload.data[1],
    }]));
  });
  socket.on('plotCache', payload => {
    logger('plotCache', payload);
    store.dispatch(addPoints(payload.subscriptionId, payload.data.points.map(v => ({
      x: v[0],
      y: v[1],
    }))));
  });
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
