import _ from 'lodash/fp';

/* eslint no-console:0 */

/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
const { ipcRenderer } = require('electron');
const {
  getTimer,
  parseConfig,
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

const defaultTransportConfigs = {
  console: {
    level: 'info',
  },
  electronIPC: {
    level: 'info',
  },
};

const getConsoleTime = getTimer();

const getDefaultTransportConfig = transport =>
  _.getOr({}, transport, defaultTransportConfigs);

const getTransportConfig = transport =>
  _.compose(
    _.merge(getDefaultTransportConfig(transport)),
    _.get('params'),
    _.find(_.compose(_.eq(transport), _.get('type')))
  )(parseConfig(global.parameters.get('LOG')));

const filterLevel = (levels, cfg) => ctx =>
  levels.indexOf(ctx.level) >= levels.indexOf(cfg.level);

const filterInclude = cfg => ctx =>
  (new RegExp(
    _.get('include', cfg), 'g')).test(ctx.category);

const filterExclude = cfg => ctx =>
  !(new RegExp(
    _.getOr('(?=a)b', 'exclude', cfg), 'g')).test(ctx.category);

const sendToConsole = (category, levels) => {
  const cfg = getTransportConfig('console');
  return level => (msg, ...rest) => {
    _.cond([
      [_.allPass([
        filterLevel(levels, cfg),
        filterInclude(cfg),
        filterExclude(cfg),
      ]),
        () => console[level].apply(null,
          [`[${category}] ${msg} +${getConsoleTime()}ms`].concat(rest)
        ),
      ],
    ])({
      level,
      category,
    });
  };
};

transportAPis.console = (category, levels) => {
  const _getLogger = sendToConsole(category, levels);
  return {
    error: _getLogger('error'),
    warn: _getLogger('warn'),
    info: _getLogger('info'),
    verbose: _getLogger('log'),
    debug: _getLogger('debug'),
    silly: _getLogger('debug'),
  };
};

// Returns a object with one method per level (silly, debug, verbose, ...)
// All messages are prefixed by category.
function getLogger(category, transports = DEFAULT_TRANSPORTS, levels = DEFAULT_LEVELS) {
  // Initialise transports with category
  const transportsWithCategory = transports
    .map(t => ({ [t]: apis[t](category, levels) }))
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
