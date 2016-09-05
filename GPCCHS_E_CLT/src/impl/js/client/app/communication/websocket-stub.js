import debug from '../utils/debug';
const logger = debug('gpcchs_e_clt:client:communication:websocket-stub');

let interval = null;
let currentStatus = false;
let receivePoints = null;

const getRandomValue = () => Math.round(Math.random() * 100);

const go = () => {
  const timestamp = Date.now();
  const points = [
    [timestamp, getRandomValue()],
    [timestamp, getRandomValue()],
    [timestamp, getRandomValue()],
  ];

  // sub1
  if (Math.floor(Math.random() * 3) + 1 === 1) {
    receivePoints({ subscriptionId: 'sub1', points });
  }
  // sub2
  if (Math.floor(Math.random() * 3) + 1 === 2) {
    receivePoints({ subscriptionId: 'sub2', points });
  }
  // sub2
  if (Math.floor(Math.random() * 3) + 1 === 3) {
    receivePoints({ subscriptionId: 'sub3', points });
  }

  logger('ran', timestamp);
};

export function init(doIt) {
  receivePoints = doIt;
}

export function status() {
  return currentStatus;
}

export function on() {
  if (!interval) {
    logger('set to on');
    interval = setInterval(go, 100);
    currentStatus = true;
  }
}

export function off() {
  if (interval) {
    logger('set to off');
    clearInterval(interval);
    currentStatus = false;
    interval = null;
  }
}

//// Websocket stub management
//if (store.getState().websocket.stub !== stubStatus()) {
//  if (store.getState().websocket.stub) {
//    stubOn();
//  } else {
//    stubOff();
//  }
//}
//import { websocketStatus } from '../actions/websocket';
//import { addPoints } from '../actions/plots';
//
//const findViewInStore = (subscriptionId, callback) => {
//  const viewId = _.findKey(
//    store.getState().views,
//    v => v.subscriptions.indexOf(subscriptionId) !== -1
//  );
//  if (!viewId) {
//    return logger('plot error, unable to find view for subscription', subscriptionId);
//  }
//  callback(null, viewId);
//};
//
//const receivePoints = payload => {
//  if (store.getState().subscriptions.waiting > 0) {
//    setTimeout(() => receivePoints(payload), 0);
//  } else {
//    logger('plot', payload);
//    findViewInStore(payload.subscriptionId,
//      (err, viewId) => store.dispatch(addPoints(viewId, payload.subscriptionId, payload.points)));
//  }
//};
//
//stubInit(receivePoints);
//primus.on('plot', receivePoints);
//primus.on('timeline', payload => {
//  logger('timeline', payload);
//});
