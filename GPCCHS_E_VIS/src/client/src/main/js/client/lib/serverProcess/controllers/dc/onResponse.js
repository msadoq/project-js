/*!*******************************************************************
 * Project : ISIS
 * Component : TODO declare component
 * \file onResponse.js
 * \author isis
 * \date 28/08/2017
 * \brief TODO brief description
 *
 * TODO complete description
 ********************************************************************/

/********************************************************************
 * HISTORY
 *
 * END-HISTORY
 ********************************************************************/



const _isBuffer = require('lodash/isBuffer');
const _isEqual = require('lodash/isEqual');
const { encode, decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onResponse');
const globalConstants = require('../../../constants');
const { pop } = require('../../../common/callbacks');
const { add: addMessage } = require('../../../store/actions/messages');
const { getStore } = require('../../store');

const protobufSuccess = encode('dc.dataControllerUtils.Status', {
  status: globalConstants.STATUS_SUCCESS,
});

/**
 * Triggered on incoming DcResponse message from DC.
 *
 * - deprotobufferize queryId
 * - check if queryId exists in registeredCallbacks singleton, if no stop logic
 * - unregister queryId
 * - deprotobufferize status
 * - if status is SUCCESS, execute callback and stop logic
 * - deprotobufferize reason
 * - send error message to client and execute callback
 *
 * @param args array
 */
module.exports = (args) => {
  logger.silly('called');

  const queryIdBuffer = args[0];
  const statusBuffer = args[1];
  const reasonBuffer = args[2];

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  const callback = pop(queryId);
  if (typeof callback === 'undefined') {
    return undefined;
  }

  // if status is SUCCESS, execute callback and stop logic
  if (_isEqual(statusBuffer, protobufSuccess)) {
    return callback(null);
  }

  try {
    // deprotobufferize reason
    const reason = _isBuffer(reasonBuffer)
      ? decode('dc.dataControllerUtils.String', reasonBuffer).string
      : reasonBuffer;

    // run callback
    return callback(typeof reason !== 'undefined' ? reason : 'no reason provided by DC');
  } catch (e) {
    logger.error('error on processing buffer', e);
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    return callback(e);
  }
};
