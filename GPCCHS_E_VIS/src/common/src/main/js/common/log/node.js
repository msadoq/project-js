const winston = require('winston');
const wCommon = require('winston/lib/winston/common');
const _isEmpty = require('lodash/fp/isEmpty');
const _pipe = require('lodash/fp/pipe');
const _update = require('lodash/fp/update');
const _dissoc = require('lodash/fp/dissoc');
const _omit = require('lodash/fp/omit');
const _path = require('lodash/fp/path');
const _noop = require('lodash/fp/noop');
const _cond = require('lodash/fp/cond');
const _isArray = require('lodash/fp/isArray');
const _stubTrue = require('lodash/fp/stubTrue');
const _map = require('lodash/fp/map');
const _constant = require('lodash/fp/constant');
const _prop = require('lodash/fp/prop');
const _propOr = require('lodash/fp/propOr');

const {
  parseConfig,
  getTimer,
  bytesConverter,
} = require('./util');
const { get } = require('../parameters');

winston.cli();

const DEFAULT_TRANSPORTS = '';

function getConfig() {
  return _isEmpty(get('LOG')) ? DEFAULT_TRANSPORTS : get('LOG');
}

// Remove process data info to pretty log into stdout
const getStdOptions = options => (_pipe(
  _update('message', m => `${m} +${options.meta.time}`),
  _dissoc('formatter'),
  _update('meta', _omit(['pname', 'pid', 'time']))
)(options));

const leftPad = number => ((number < 10) ? `0${number}` : number);
const formatTime = (now) => {
  let time = `${now.getFullYear()}-${leftPad(now.getMonth() + 1)}-${leftPad(now.getDate())}`;
  time += ` ${leftPad(now.getHours())}:${leftPad(now.getMinutes())}:${leftPad(now.getSeconds())}`;
  return time;
};

const getMonitoringOptions = options => (_pipe(
  _update('message', () =>
`[${options.meta.pname}(pid=${options.meta.pid})]
= monitoring ======== (${formatTime(new Date(options.meta.latency.time))})
average time consumption by loop ${options.meta.latency.avg}
memory consumption
  rss=${bytesConverter(options.meta.memUsage.rss)}
  heapTotal=${bytesConverter(options.meta.memUsage.heapTotal)}
  heapUsed=${bytesConverter(options.meta.memUsage.heapUsed)}
=====================`
  ),
  _dissoc('formatter'),
  _update('meta', _omit(['memUsage', 'latency', 'pname', 'pid', 'time']))
)(options));

let cpt = 0;
const availableTransports = {
  console: (args) => {
    const opts = Object.assign({
      timestamp: false,
      level: 'info',
      colorize: true,
      name: `console ${cpt += 1}`,
      formatter: (options) => {
        if (_path(['meta', 'memUsage'], options)) {
          return wCommon.log(getMonitoringOptions(options));
        }
        return wCommon.log(getStdOptions(options));
      },
    }, args);
    return new winston.transports.Console(opts);
  },
  file: (args) => {
    const opts = Object.assign({
      filename: get('LOG_FILENAME'),
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
const getTransports = cfg =>
  cfg.map(t => availableTransports[t.type](t.params));

const loggers = {};

const getProcessName = ({ pname }) => pname || (/node$/g.test(process.title) ? 'NONAME' : process.title);
const getProcessId = ({ pid }) => pid || process.pid;
const getProcessLabel = meta => `[${getProcessName(meta)}(${getProcessId(meta)})]`;

const getNoOpTransport = () => ({
  error: _noop,
  warn: _noop,
  info: _noop,
  verbose: _noop,
  debug: _noop,
  silly: _noop,
});

// Create a Winston logger, that contains their own transports (console, http, file, ...)
// Each message is prefixed by category.
// Messages can be filtered by category using a regular expression
function getLogger(category, enabledTransports) {
  if (loggers[category]) {
    return loggers[category];
  }

  const config = parseConfig(getConfig());

  const transports = getTransports(
    _cond([
      [_isArray, _map(k => ({ type: k }))],
      [_stubTrue, _constant(config)],
    ])(enabledTransports)
  );

  if (transports.length === 0) {
    return getNoOpTransport();
  }

  winston.loggers.add(category, {
    transports,
  });
  const logger = loggers[category] = winston.loggers.get(category);

  logger.filters.push((level, msg, meta) => `${getProcessLabel(meta)}[${category}] ${msg}`);

  // Monkey patch each transport to provide filter logic.
  // If filter is defined, category must match filter regular expression
  transports.forEach((t) => {
    const transportConfig = config.filter(c => c.type === t.constructor.prototype.name)[0];
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
        const meta = args[2];

        if (params.time) {
          meta.time = meta.time || `${getTime()}ms`;
        } else {
          delete meta.time;
        }

        if (params.process) {
          meta.pname = getProcessName(meta);
          meta.pid = getProcessId(meta);
        } else {
          delete meta.pname;
          delete meta.pid;
        }

        if (params.category) {
          meta.category = category;
        } else {
          delete meta.category;
        }

        log.apply(this, args);
      }
    }

    Object.assign(t, { log: logWithFilter });
  });

  return logger;
}

module.exports = {
  getStdOptions,
  getMonitoringOptions,
  availableTransports,
  getLogger,
};
