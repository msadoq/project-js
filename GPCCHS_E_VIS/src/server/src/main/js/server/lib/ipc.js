const { v4 } = require('uuid');
const logger = require('common/log')('main:ipc');
const { set: setCallback } = require('common/callbacks');
const globalConstants = require('common/constants');

module.exports = {
  main: {
    rpc: (method, payload, callback) => {
      logger.debug(`sending rpc call ${method} to main`);
      const queryId = v4();
      setCallback(queryId, callback);
      process.send({
        type: globalConstants.IPC_RPC_REQUEST,
        queryId,
        method,
        payload,
      });
    },
    message: (method, payload) => {
      logger.debug(`sending message ${method} to main`);
      process.send({ type: globalConstants.IPC_MESSAGE, method, payload });
    },
  },
};
