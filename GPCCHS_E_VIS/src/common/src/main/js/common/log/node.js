const winston = require('winston');
const wCommon = require('winston/lib/winston/common');
const fs = require('fs');
const path = require('path');
const _ = require('lodash/fp');
//const mkdirp = require('mkdirp');

const {
  getTimer,
  formatProductLog,
} = require('./util');
const { get } = require('../parameters');
const bytesToString = require('../utils/bytesConverter');

const {
  LOG_LOCAL_FILENAME,
  LOG_DIST_FILENAME,
} = require('../constants');

winston.cli();

let DEFAULT_TRANSPORTS = 'file';
if (process.env.NODE_ENV === 'development') {
  DEFAULT_TRANSPORTS = 'console:http';
}

function getConfig() {
  return get('LOG') || DEFAULT_TRANSPORTS;
}

// Convert value to boolean or number if possible
const parseValue = value => (
  value === 'true' ? true : // eslint-disable-line no-nested-ternary
    (value === 'false' ? false :
      (Number(value) || value)));

// Deserialize param string to object
// param string format: <param1>=<value1>,<param2>=<value2>
const parseParams = _.pipe(
  _.defaultTo(''),
  _.split(','),
  _.map(_.split('=')),
  _.map(p => ({
    [p[0]]: parseValue(p[1]),
  })),
  _.reduce((acc, p) => _.assign(acc, p), {
    time: true,
    process: true,
    category: false,
    filter: '.*',
  })
);

// Deserialize string to object
// String format: <logger1>?<param1>=<value1>,<param2>=<value2>:<logger2>?<param1>=<value1>,...:...
const parseConfig = _.pipe(
  _.split(':'),
  _.map(_.split('?')),
  _.map(t => ({
    type: t[0],
    params: parseParams(t[1]),
  }))
);

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

const distFormatter = ({ message }) => message.replace(/^\[.+\]\[.+\]\s?/g, '');

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
  dist: args => new winston.transports.File(
    Object.assign({
      filename: LOG_DIST_FILENAME,
      level: 'info',
      json: false,
      formatter: distFormatter,
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
  // zmq: (args) => new Zmq(
  //   Object.assign({
  //     level: 'info',
  //     transport: 'tcp',
  //     address: '127.0.0.1',
  //     port: 5042,
  //     name: `zmq ${cpt++}`,
  //   }, args)),
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

const productLog = (uid, ...args) => {
  /* mkdirp(get('LOG_FOLDER'), (err) => {
    if (err) {
      console.log(err); // eslint-disable-line no-console
    } else {
      fs.appendFile(
        path.join(get('LOG_FOLDER'), LOG_DIST_FILENAME),
        formatProductLog(uid, ...args));
    }
  }); */
};

const productLogSync = (uid, ...args) => {
  /* mkdirp.sync(get('LOG_FOLDER'));
  fs.appendFileSync(
    path.join(get('LOG_FOLDER'), LOG_DIST_FILENAME),
    formatProductLog(uid, ...args)); */
};


module.exports = {
  parseParams,
  parseConfig,
  parseValue,
  getStdOptions,
  getMonitoringOptions,
  availableTransports,
  getLogger,
  productLog,
  productLogSync,
};
