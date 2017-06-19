const { fork: forkChildProcess } = require('child_process');
const logger = require('../logManager')('main:childProcess');

const processes = {};

function fork(id, path, options, onMessage, callback) {
  processes[id] = forkChildProcess(path, options);
  processes[id].on('close', (code, signal) => {
    logger.debug(`child process ${id} closed with code ${code} (${signal})`);
  });
  processes[id].on('disconnect', () => logger.debug(`child process ${id} disconnected`));
  processes[id].on('error', (err) => {
    throw err;
  });
  processes[id].on('exit', (code, signal) => {
    logger.debug(`child process ${id} exited with code ${code} (${signal})`);
  });

  // only for ready message
  processes[id].on('message', (data) => {
    if (data !== 'ready') {
      if (onMessage) {
        onMessage(data);
      }
      return;
    }

    logger.debug(`child process ${id} is ready`, data);
    callback(null);
  });
}

function get(id) {
  return processes[id];
}

function kill(id) {
  if (!get(id)) {
    return logger.warn(`unknown process to kill ${id}`);
  }

  logger.info(`killing process ${id}`);
  return get(id).kill();
}

module.exports = { fork, get, kill };
