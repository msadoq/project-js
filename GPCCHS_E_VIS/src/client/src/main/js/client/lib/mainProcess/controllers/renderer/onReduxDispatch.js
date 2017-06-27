const { server } = require('../../ipc');

/**
 * Triggered when renderer process sends a Redux action to main process
 *
 * - forward to server process
 *
 * @param action
 */
module.exports = (action) => {
  server.sendReduxDispatch(action);
};
