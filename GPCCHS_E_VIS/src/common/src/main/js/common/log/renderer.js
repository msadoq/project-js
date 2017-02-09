const _compose = require('lodash/fp/compose');
const _uniq = require('lodash/fp/uniq');
const _filter = require('lodash/fp/filter');
const _eq = require('lodash/fp/eq');
const _map = require('lodash/fp/map');
const _prop = require('lodash/fp/prop');
const _getOr = require('lodash/fp/getOr');
const _merge = require('lodash/fp/merge');
const _find = require('lodash/fp/find');
const _get = require('lodash/fp/get');
const _cond = require('lodash/fp/cond');
const _allPass = require('lodash/fp/allPass');

const Console = '../utils/console';

const {
  getTimer,
  parseConfig,
} = require('./util');

const DEFAULT_TRANSPORTS =
  _compose(
    _uniq,
    _filter(_eq('console')),
    _map(_prop('type'))
  )(parseConfig(global.parameters.get('LOG')));

const DEFAULT_LEVELS = ['silly', 'debug', 'verbose', 'info', 'warn', 'error'];

const transportAPis = {};
const apis = transportAPis;

const defaultTransportConfigs = {
  console: {
    level: 'info',
  },
};

const getConsoleTime = getTimer();

const getDefaultTransportConfig = transport =>
  _getOr({}, transport, defaultTransportConfigs);

const getTransportConfig = transport =>
  _compose(
    _merge(getDefaultTransportConfig(transport)),
    _get('params'),
    _find(_compose(_eq(transport), _get('type')))
  )(parseConfig(global.parameters.get('LOG')));

const filterLevel = (levels, cfg) => ctx =>
  levels.indexOf(ctx.level) >= levels.indexOf(cfg.level);

const filterInclude = cfg => ctx =>
  (new RegExp(
    _get('include', cfg), 'g')).test(ctx.category);

const filterExclude = cfg => ctx =>
  !(new RegExp(
    _getOr('(?=a)b', 'exclude', cfg), 'g')).test(ctx.category);

const sendToConsole = (category, levels) => {
  const cfg = getTransportConfig('console');
  return level => (msg, ...rest) => {
    _cond([
      [_allPass([
        filterLevel(levels, cfg),
        filterInclude(cfg),
        filterExclude(cfg),
      ]),
        () => Console[level].apply(null,
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
    const ts = transports.reduce((fn, t) => function compose(...args) {
      fn(...args);
      transportsWithCategory[t][l](...args);
    }, () => {});
    return Object.assign(acc, { [l]: ts });
  }, {});
}

module.exports = {
  getLogger,
  transportAPis,
  sendToConsole,
};
