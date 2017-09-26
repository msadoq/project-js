// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : #5838 : 16/06/2017 : Add a third parameter to childProcess to allow args passing to child process
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Cleanup child process fork method options
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// END-HISTORY
// ====================================================================

const { fork: forkChildProcess } = require('child_process');
const logger = require('../logManager')('main:childProcess');
const {
  CHILD_PROCESS_READY_MESSAGE_TYPE_KEY,
} = require('../../constants');

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
    if (!data) {
      logger.warn('empty IPC message received');
      return;
    }
    if (data[CHILD_PROCESS_READY_MESSAGE_TYPE_KEY] === true) {
      logger.debug(`child process ${id} is ready`);
      callback(null, data.payload);
      return;
    }

    if (onMessage) {
      onMessage(data);
    }
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
