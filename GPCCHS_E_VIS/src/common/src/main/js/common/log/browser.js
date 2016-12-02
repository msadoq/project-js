/* eslint no-console:0 */

// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');
const {
  getTimer,
} = require('./util');

const DEFAULT_TRANSPORTS = ['console', 'electronIPC'];
const DEFAULT_LEVELS = ['silly', 'debug', 'verbose', 'info', 'warn', 'error'];

const transportAPis = {};
const apis = transportAPis;

const getIPCTime = getTimer();

function sendOverIPC(category, level) {
  function sendToMaster(msg, ...rest) {
    ipcRenderer.send('log', {
      category,
      level,
      msg,
      rest: { // eslint-disable-line prefer-rest-params
        ...rest.reduce((acc, arg) => ({ ...acc, ...arg }), {}),
        time: `${getIPCTime()}ms`,
        pid: process.pid,
        pname: process.title,
      },
    });
  }

  return function sendWithContext(msg, ...other) {
    sendToMaster(msg, ...other);
  };
}

transportAPis.electronIPC = category => ({
  error: sendOverIPC(category, 'error'),
  warn: sendOverIPC(category, 'warn'),
  info: sendOverIPC(category, 'info'),
  verbose: sendOverIPC(category, 'verbose'),
  debug: sendOverIPC(category, 'debug'),
  silly: sendOverIPC(category, 'silly'),
});

const getConsoleTime = getTimer();

function sendToConsole(category, level) {
  return function sendWithContext(msg, ...rest) {
    // eslint-disable-next-line prefer-rest-params
    console[level].apply(null, [`[${category}] ${msg} +${getConsoleTime()}ms`].concat(rest));
  };
}

transportAPis.console = category => ({
  error: sendToConsole(category, 'error'),
  warn: sendToConsole(category, 'warn'),
  info: sendToConsole(category, 'info'),
  verbose: sendToConsole(category, 'log'),
  debug: sendToConsole(category, 'debug'),
  silly: sendToConsole(category, 'debug'),
});

// Returns a object with one method per level (silly, debug, verbose, ...)
// All messages are prefixed by category.
function getLogger(category, transports = DEFAULT_TRANSPORTS, levels = DEFAULT_LEVELS) {
  // Initialise transports with category
  const transportsWithCategory = transports
    .map(t => ({ [t]: apis[t](category) }))
    .reduce((acc, t) => Object.assign(acc, t), {});

  // For each enabled level, create a function that call each enabled transport
  return levels.reduce((acc, l) => {
    // eslint-disable-next-line no-param-reassign
    acc[l] = transports.reduce((fn, t) =>
      function compose(...args) {
        fn(...args);
        transportsWithCategory[t][l](...args);
      }, () => {});
    return acc;
  }, {});
}

module.exports = {
  getLogger,
  transportAPis,
  sendOverIPC,
  sendToConsole,
};
