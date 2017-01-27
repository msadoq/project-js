const winston = require('winston');
const wCommon = require('winston/lib/winston/common');
const _ = require('lodash/fp');
const { parseConfig } = require('./util');

const {
  getTimer,
  bytesConverter,
} = require('./util');
const { get } = require('../parameters');

const {
  LOG_LOCAL_FILENAME,
} = require('../constants');

winston.cli();

const DEFAULT_TRANSPORTS = '';

function getConfig() {
  return _.isEmpty(get('LOG')) ? DEFAULT_TRANSPORTS : get('LOG');
}

// Remove process data info to pretty log into stdout
const getStdOptions = options => (_.pipe(
  _.update('message', m => `${m} +${options.meta.time}`),
  _.dissoc('formatter'),
  _.update('meta', _.omit(['pname', 'pid', 'time']))
)(options));

const leftPad = number => ((number < 10) ? `0${number}` : number);
const formatTime = (now) => {
  let time = `${now.getFullYear()}-${leftPad(now.getMonth() + 1)}-${leftPad(now.getDate())}`;
  time += ` ${leftPad(now.getHours())}:${leftPad(now.getMinutes())}:${leftPad(now.getSeconds())}`;
  return time;
};

const getMonitoringOptions = options => (_.pipe(
  _.update('message', () =>
`[${options.meta.pname}(pid=${options.meta.pid})]
= monitoring ======== (${formatTime(new Date(options.meta.latency.time))})
average time consumption by loop ${options.meta.latency.avg}
memory consumption
  rss=${bytesConverter(options.meta.memUsage.rss)}
  heapTotal=${bytesConverter(options.meta.memUsage.heapTotal)}
  heapUsed=${bytesConverter(options.meta.memUsage.heapUsed)}
=====================`
  ),
  _.dissoc('formatter'),
  _.update('meta', _.omit(['memUsage', 'latency', 'pname', 'pid', 'time']))
)(options));

let cpt = 0;
const availableTransports = {
  // eslint-disable-next-line no-return-assign
  console: args => new winston.transports.Console(
    Object.assign({
      timestamp: false,
      level: 'info',
      colorize: true,
      name: `console ${cpt += 1}`,
      formatter: (options) => {
        if (_.path(['meta', 'memUsage'], options)) {
          return wCommon.log(getMonitoringOptions(options));
        }
        return wCommon.log(getStdOptions(options));
      },
    }, args)),
  // eslint-disable-next-line no-return-assign
  file: args => new winston.transports.File(
    Object.assign({
      filename: LOG_LOCAL_FILENAME,
      timestamp: true,
      level: 'info',
      json: false,
      name: `file ${cpt += 1}`, // Internal name of transport, must be unique
      maxsize: 10 * 1000 * 1000, // 10 mo per file
      maxFiles: 100,
      tailable: true, // most recent file is always named `filename`
    }, args)),
  // eslint-disable-next-line no-return-assign
  http: args => new winston.transports.Http(
    Object.assign({
      host: 'localhost',
      port: 9003,
    }, args)),
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
  error: _.noop,
  warn: _.noop,
  info: _.noop,
  verbose: _.noop,
  debug: _.noop,
  silly: _.noop,
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
    _.cond([
      [_.isArray, _.map(k => ({ type: k }))],
      [_.stubTrue, _.constant(config)],
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
    const params = _.prop('params', transportConfig);
    if (!params) {
      return;
    }
    const filter = _.prop('filter', params);
    const log = t.constructor.prototype.log;

    // eslint-disable-next-line no-param-reassign
    t.log = function logWithFilter(...args) {
      if ((new RegExp(filter, 'g')).test(category)) {
        const meta = args[2];

        if (params.time) {
          // eslint-disable-next-line no-param-reassign
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
    };
  });

  return logger;
}

// If executed into electron main process, listen to IPC 'log' messages coming from child processes
if (process.versions.electron) {
  // eslint-disable-next-line
  const { ipcMain } = require('electron');

  ipcMain.on('log', (event, { category, level, msg, rest }) => {
    if (!loggers[category]) {
      loggers[category] = getLogger(category);
    }

    loggers[category][level].apply(null, [msg].concat(rest));
  });
}

module.exports = {
  getStdOptions,
  getMonitoringOptions,
  availableTransports,
  getLogger,
};
