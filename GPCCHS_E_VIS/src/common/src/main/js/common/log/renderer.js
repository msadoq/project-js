/* eslint no-console:0 */

/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
const { ipcRenderer } = require('electron');
const {
  getTimer,
} = require('./util');

let DEFAULT_TRANSPORTS = ['electronIPC'];
if (global.parameters.get('DEBUG') === 'on') {
  DEFAULT_TRANSPORTS = ['console', 'electronIPC'];
}

const DEFAULT_LEVELS = ['silly', 'debug', 'verbose', 'info', 'warn', 'error'];

const transportAPis = {};
const apis = transportAPis;

const getIPCTime = getTimer();

const sendOverIPC = (category, level) => {
  function sendToMaster(msg, ...args) {
    const rest = args.reduce((acc, arg) => Object.assign({}, acc, arg), {});
    ipcRenderer.send('log', {
      category,
      level,
      msg,
      rest: Object.assign(rest, {
        time: `${getIPCTime()}ms`,
        pid: process.pid,
        pname: process.title,
      }),
    });
  }

  return function sendWithContext(msg, ...rest) {
    const args = rest.reduce((acc, el) => (
      acc.concat(typeof el === 'string' ? { info: el } : el)
    ), []);
    sendToMaster(msg, ...args);
  };
};

transportAPis.electronIPC = category => ({
  error: sendOverIPC(category, 'error'),
  warn: sendOverIPC(category, 'warn'),
  info: sendOverIPC(category, 'info'),
  verbose: sendOverIPC(category, 'verbose'),
  debug: sendOverIPC(category, 'debug'),
  silly: sendOverIPC(category, 'silly'),
});

const getConsoleTime = getTimer();

const sendToConsole = (category, level) => (msg, ...rest) => {
  console[level].apply(null, [`[${category}] ${msg} +${getConsoleTime()}ms`].concat(rest));
};

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
