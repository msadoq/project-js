const { encode } = require('../../../utils/adapters');
const globalConstants = require('common/constants');
const _ = require('lodash/fp');

/**
 * Send product log to DC
 *
 * @param pushToDc
 * @param payload
 */
module.exports = (pushToDc, { uid, args }) => {
  pushToDc([
    encode('dc.dataControllerUtils.Header', { messageType: globalConstants.MESSAGETYPE_LOG_SEND }),
    encode('dc.dataControllerUtils.String', { string: _.uniqueId('log_') }),
    encode('dc.dataControllerUtils.SendLog', {
      uid,
      arguments: args,
    }),
  ]);
};
