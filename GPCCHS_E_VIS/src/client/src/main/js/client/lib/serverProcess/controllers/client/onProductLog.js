const { dc } = require('../../ipc');

/**
 * Send product log to DC
 *
 * @param pushToDc
 * @param payload
 */
module.exports = (pushToDc, { uid, args }) => {
  dc.sendProductLog(uid, args);
};
