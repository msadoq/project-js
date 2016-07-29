import debug from 'debug';
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
