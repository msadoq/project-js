const winston = require('winston');
const {
  getTimer,
 } = require('./util');

winston.cli();

const DEFAULT_TRANSPORTS = 'file';

const configStr = process.env.LOG || DEFAULT_TRANSPORTS;

// Convert value to boolean or number if possible
const parseValue = value => (
  value === 'true' ? true : // eslint-disable-line no-nested-ternary
    (value === 'false' ? false :
      (Number(value) || value)));

// Deserialize param string to object
// param string format: <param1>=<value1>,<param2>=<value2>
const parseParams = paramStr =>
  Object.assign({ // Default parameter values
    time: true,
    process: true,
  }, (paramStr || '')
    .split(',')
    .map(p => p.split('='))
    .map(p => ({
      [p[0]]: parseValue(p[1]),
    })
  ).reduce((acc, p) => Object.assign(acc, p), {}));

// Deserialize string to object
// String format: <logger1>?<param1>=<value1>,<param2>=<value2>:<logger2>?<param1>=<value1>,...:...
const parseConfig = config =>
  config.split(':')
    .map(t => t.split('?'))
    .map(t => ({
      type: t[0],
      params: parseParams(t[1]),
    }));

let cpt = 0;
const availableTransports = {
  // eslint-disable-next-line no-return-assign
  console: args => new winston.transports.Console(
    Object.assign({
      timestamp: false,
      level: 'info',
      colorize: true,
      name: `console ${cpt += 1}`,
    }, args)),
  // eslint-disable-next-line no-return-assign
  file: args => new winston.transports.File(
    Object.assign({
      filename: 'logs',
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

const config = parseConfig(configStr);

// Create and returns list of wanted transports
const getTransports = cfg =>
  cfg.map(t => availableTransports[t.type](t.params));

const loggers = {};

// Create a Winston logger, that contains their own transports (console, http, file, ...)
// Each message is prefixed by category.
// Messages can be filtered by category using a regular expression
function getLogger(category) {
  if (loggers[category]) {
    return loggers[category];
  }

  const transports = getTransports(config);
  winston.loggers.add(category, {
    transports,
  });
  const logger = loggers[category] = winston.loggers.get(category);

  logger.filters.push((level, msg) => `[${category}] ${msg}`);

  // Monkey patch each transport to provide filter logic.
  // If filter is defined, category must match filter regular expression
  transports.forEach((t) => {
    const transportConfig = config.filter(c => c.type === t.constructor.prototype.name)[0];
    const filter = transportConfig.params.filter;
    const params = transportConfig.params;
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
          meta.pname = meta.pname || (/node$/g.test(process.title) ? 'NONAME' : process.title);
          meta.pid = meta.pid || process.pid;
        } else {
          delete meta.pname;
          delete meta.pid;
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
  parseConfig,
  parseValue,
  availableTransports,
  getLogger,
};
