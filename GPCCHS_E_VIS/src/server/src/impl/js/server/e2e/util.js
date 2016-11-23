const testUtils = require('../lib/utils/test');
const Primus = require('common/websocket'); // eslint-disable-line import/no-extraneous-dependencies
const cp = require('child_process');

// If E2E_URL is not defined, HSS server is started
const mustStartHSS = !process.env.E2E_URL;
const PORT = mustStartHSS ? 3001 : process.env.PORT;

process.env.E2E_URL = process.env.E2E_URL || 'http://localhost';
process.env.PORT = PORT;

// Array of callbacks triggered on ws.on('data')
let onDataCallbacks = [];

// start WS connection to HSS
const startWS = () => { // eslint-disable-line arrow-body-style
  return new Promise((resolve) => {
    const ws = new Primus(testUtils.e2eUrl());
    ws.on('open', () => {
      ws.on('data', (...args) => {
        onDataCallbacks.forEach(cb => cb(...args));
      });
      resolve(ws);
    });
  });
};

// stop WS connection to HSS
const stopWS = ws => Promise.resolve(ws.end());

// Add a callback to onDataCallbacks array. They are called on this.on('data') event
const addDataCallback = (cb) => {
  const i = onDataCallbacks.push(cb);
  // Returns function to remove callback from onDataCallbacks array
  return () => onDataCallbacks.splice(i - 1, 1);
};

// Reset onDataCallbacks array
const resetDataCallbacks = () => { onDataCallbacks = []; };

// Start HSS
const startHSS = () => { // eslint-disable-line arrow-body-style
  if (!mustStartHSS) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const hss = cp.fork('index.js', [], {
      silent: true, // disable stdin, stdout, stderr
      env: {
        PORT,
        RUN_BY_MOCHA: 'true',
        ZMQ_GPCCDC_PUSH: 'tcp://127.0.0.1:5043', // use different port from standard HSS
        ZMQ_GPCCDC_PULL: 'tcp://127.0.0.1:49166', // use different port from standard HSS
      },
    });
    hss.on('message', () => resolve(hss));
  });
};

// Stop HSS
const stopHSS = (hss) => { // eslint-disable-line arrow-body-style
  return new Promise((resolve) => {
    if (hss) {
      hss.kill();
      resolve();
    }
  });
};

module.exports = {
  startWS,
  stopWS,
  addDataCallback,
  resetDataCallbacks,
  startHSS,
  stopHSS,
};
