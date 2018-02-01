// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

const util = require('util');
const winston = require('winston');
const wCommon = require('winston/lib/winston/common');
const _isEmpty = require('lodash/fp/isEmpty');
const _pipe = require('lodash/fp/pipe');
const _update = require('lodash/fp/update');
const _dissoc = require('lodash/fp/dissoc');
const _omit = require('lodash/fp/omit');
const _noop = require('lodash/fp/noop');
const _prop = require('lodash/fp/prop');
const _propOr = require('lodash/fp/propOr');
const _uniqueId = require('lodash/fp/uniqueId');

const {
  parseConfig,
  getTimer,
} = require('./util');
const { get } = require('../configurationManager');

winston.cli();

const DEFAULT_TRANSPORTS = '';

function getDefaultConfig() {
  return _isEmpty(get('LOG')) ? DEFAULT_TRANSPORTS : get('LOG');
}

// Remove process data info to pretty log into stdout
const getStdOptions = options => (_pipe(
  _update('message', m => `${m} +${options.meta.time}`),
  _dissoc('formatter'),
  _update('meta', _omit(['pname', 'pid', 'time']))
)(options));

const createCustomLogger = (name, f, options = {}) => {
  function CustomLogger() {
    winston.Transport.call(this, options);
    this.level = options.level || 'info';
  }
  winston.transports[name] = CustomLogger;

  util.inherits(CustomLogger, winston.Transport);

  CustomLogger.prototype.name = _uniqueId(`${name}_`);
  CustomLogger.prototype.type = name;

  CustomLogger.prototype.log = (level, msg, meta, callback) => {
    f(level, msg, meta);
    callback(null, true);
  };

  return new CustomLogger();
};

let cpt = 0;
const availableTransports = {
  console: (args) => {
    const opts = Object.assign({
      timestamp: false,
      level: 'info',
      colorize: true,
      name: `console ${cpt += 1}`,
      formatter: options => wCommon.log(getStdOptions(options)),
    }, args);
    return new winston.transports.Console(opts);
  },
  file: (args) => {
    const opts = Object.assign({
      timestamp: true,
      level: 'info',
      json: false,
      name: `file ${cpt += 1}`, // Internal name of transport, must be unique
      maxsize: 10 * 1000 * 1000, // 10 mo per file
      maxFiles: 100,
      tailable: true, // most recent file is always named `filename`
    }, args);
    return new winston.transports.File(opts);
  },
  http: (args) => {
    const opts = Object.assign({
      host: 'localhost',
      port: 9003,
    }, args);
    return new winston.transports.Http(opts);
  },
};

const getTime = getTimer();

// Create and returns list of wanted transports
const getTransports = (transports, cfg) =>
  cfg.map(t => transports[t.type](t.params));

// let loggers = {};
// const resetLoggers = () => { loggers = {} }

const getProcessName = ({ pname }) => pname || (/node$/g.test(process.title) ? 'NONAME' : process.title);
const getProcessId = ({ pid }) => pid || process.pid;
const getProcessLabel = meta => `[${getProcessName(meta)}(${getProcessId(meta)})]`;

const noopTransport = {
  error: _noop,
  warn: _noop,
  info: _noop,
  verbose: _noop,
  debug: _noop,
  silly: _noop,
};

// Create a Winston logger, that contains their own transports (console, http, file, ...)
// Each message is prefixed by category.
// Messages can be filtered by category using a regular expression
function _getLogger(category, config = getDefaultConfig(), allTransports = availableTransports) {
  const configObj = parseConfig(config);

  const transports = getTransports(
    allTransports,
    configObj
  );

  if (transports.length === 0) {
    return noopTransport;
  }

  const id = _uniqueId('transport_');
  winston.loggers.add(id, {
    transports,
  });
  const logger = winston.loggers.get(id);

  logger.filters.push((level, msg, meta) => `${getProcessLabel(meta)}[${category}] ${msg}`);

  // Monkey patch each transport to provide filter logic.
  // If filter is defined, category must match filter regular expression
  transports.forEach((t, i) => {
    const transportConfig = _prop(i, configObj);
    const params = _prop('params', transportConfig);
    if (!params) {
      return;
    }
    const include = _prop('include', params);
    const exclude = _propOr('(?=a)b', 'exclude', params);
    const log = t.constructor.prototype.log;

    function logWithFilter(...args) {
      if ((new RegExp(include, 'g')).test(category) &&
        !(new RegExp(exclude, 'g')).test(category)) {
        const meta = args[2] || {};

        if (params.time) {
          meta.time = meta.time || `${getTime()}ms`; // TODO fix : the module mutate arguments (e.g. dataMap)!!
        } else {
          delete meta.time; // TODO fix : the module mutate arguments (e.g. dataMap)!!
        }

        if (params.process) {
          meta.pname = getProcessName(meta); // TODO fix : the module mutate arguments (e.g. dataMap)!!
          meta.pid = getProcessId(meta); // TODO fix : the module mutate arguments (e.g. dataMap)!!
        } else {
          delete meta.pname; // TODO fix : the module mutate arguments (e.g. dataMap)!!
          delete meta.pid; // TODO fix : the module mutate arguments (e.g. dataMap)!!
        }

        if (params.category) {
          meta.category = category; // TODO fix : the module mutate arguments (e.g. dataMap)!!
        } else {
          delete meta.category; // TODO fix : the module mutate arguments (e.g. dataMap)!!
        }

        log.apply(this, args);
      }
    }

    Object.assign(t, { log: logWithFilter });
  });

  return logger;
}

const getLogger = (...loggerArgs) => {
  let logger;

  const getLazyInitLogFn = level => (...logArgs) => {
    if (!logger) {
      logger = _getLogger(...loggerArgs);
    }
    if (logger[level] !== _noop) {
      logger[level](...logArgs);
    }
  };

  return {
    error: getLazyInitLogFn('error'),
    warn: getLazyInitLogFn('warn'),
    info: getLazyInitLogFn('info'),
    verbose: getLazyInitLogFn('verbose'),
    debug: getLazyInitLogFn('debug'),
    silly: getLazyInitLogFn('silly'),
  };
};

const memoizedGetLogger = (() => {
  const loggers = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (!loggers[key]) {
      loggers[key] = getLogger(...args);
    }
    return loggers[key];
  };
})();

module.exports = {
  getStdOptions,
  availableTransports,
  getLogger: memoizedGetLogger,
  createCustomLogger,
};
