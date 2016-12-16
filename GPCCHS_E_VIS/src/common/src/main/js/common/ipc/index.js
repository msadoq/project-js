const getLogger = require('../log');
const { set } = require('../callbacks');

const logger = getLogger('ipc:index');

const sendMessage = module.exports.sendMessage = (event, payload, queryId) => {
  process.send({ event, payload, queryId });
};

module.exports.bind = (controller) => {
  process.send('ready');
  logger.info('process is ready');
  process.on('message', (data) => {
    logger.debug('incoming message', data);
    const { queryId, method, payload } = data;
    if (!method) {
      return logger.warn('invalid message received (no method)');
    }

    const fn = controller[method];
    if (!fn) {
      return logger.warn(`invalid message received (unknown method) '${method}'`);
    }

    // this call is waiting for an answer
    if (queryId) {
      set(queryId, responsePayload => sendMessage(null, responsePayload, queryId));
      return fn(queryId, payload); // TODO pass answer callback that pop() and run
    }

    logger.debug(`running '${method}'`);
    return fn(payload);
  });
};

