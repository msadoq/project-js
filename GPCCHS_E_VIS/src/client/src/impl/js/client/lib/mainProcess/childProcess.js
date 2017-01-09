import { fork as forkChildProcess } from 'child_process';
import getLogger from 'common/log';
import parameters from 'common/parameters';

const logger = getLogger('main:childProcess');

const processes = {};

export function fork(id, path, callback) {
  const forkOptions = {
    execPath: parameters.get('NODE_PATH'),
    env: {
      DEBUG: parameters.get('DEBUG'),
      SERVER_PORT: parameters.get('SERVER_PORT'),
      ZMQ_GPCCDC_PUSH: parameters.get('ZMQ_GPCCDC_PUSH'),
      ZMQ_GPCCDC_PULL: parameters.get('ZMQ_GPCCDC_PULL'),
      STUB_DC_ON: parameters.get('STUB_DC_ON'),
      MONITORING: parameters.get('MONITORING'),
      PROFILING: parameters.get('PROFILING'),
      LOG: parameters.get('LOG'),
    },
  };
  logger.info(`opening child process ${id}`);
  processes[id] = forkChildProcess(path, [], forkOptions);
  processes[id].on('close', (code, signal) => {
    logger.verbose(`child process ${id} closed with code ${code} (${signal})`);
  });
  processes[id].on('disconnect', () => logger.verbose(`child process ${id} disconnected`));
  processes[id].on('error', (err) => {
    throw err;
  });
  processes[id].on('exit', (code, signal) => {
    logger.verbose(`child process ${id} exited with code ${code} (${signal})`);
  });

  // only for ready message
  processes[id].on('message', (data) => {
    if (data !== 'ready') {
      return;
    }

    logger.debug(`child process ${id} is ready`, data);
    return callback(null);
  });
}

export function get(id) {
  return processes[id];
}

export function kill(id) {
  if (!get(id)) {
    return logger.warn(`unknown process to kill ${id}`);
  }

  logger.info(`killing process ${id}`);
  get(id).kill();
}
