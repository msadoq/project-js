import { fork as forkChildProcess } from 'child_process';
import { v4 } from 'node-uuid';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { set, pop } from 'common/callbacks';

const logger = getLogger('main:childProcess');

const processes = {};

export function fork(id, path, callback) {
  const forkOptions = {
    execPath: '/usr/share/isis/node-v6.3.0-linux-x64/bin/node',
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
  processes[id].on('message', (data) => {
    logger.debug(`child process ${id} incoming message`, data);

    if (data === 'ready') {
      logger.debug(`child process ${id} is ready`, data);
      return callback(null);
    }

    const { event, payload, queryId } = data;
    if (queryId) {
      logger.debug(`rpc response received for ${queryId}`);
      const cb = pop(queryId);
      return cb
        ? cb(data)
        : logger.warn('invalid message received (unknown queryId)');
    }

    // TODO simple message
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

/**
 * RPC request
 *
 * @param id
 * @param method
 * @param payload
 * @param callback
 */
export function rpc(id, method, payload, callback) {
  if (!get(id)) {
    return logger.warn(`rpc call on unknown process ${id}`);
  }

  logger.debug(`sending rpc call ${method} to ${id}`);
  const queryId = v4();
  set(queryId, data => callback(data.payload));
  get(id).send({ queryId, method, payload });
}

/**
 * Simple message
 *
 * @param id
 * @param method
 * @param payload
 * @return {*}
 */
export function send(id, method, payload) {
  if (!get(id)) {
    return logger.warn(`sending on unknown process ${id}`);
  }

  logger.debug(`sending message ${method} to ${id}`);
  get(id).send({ method, payload });
}
