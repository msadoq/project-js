const debug = require('../../io/debug')('controllers:onFilepathData');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
// eslint-disable-next-line import/no-extraneous-dependencies
const { decode } = require('common/protobuf');
// eslint-disable-next-line import/no-extraneous-dependencies
const registeredCallbacks = require('common/callbacks/register');

const { sendToMain } = require('../../websocket/sendToMain');


/**
 * Triggered on DC filepath from oId request response.
 *
 * - deprotobufferize filepath
 * - store filepath
 * - forward to client
 *
 * @param buffer
 */

const filepathData = (websocketHandler, queryIdBuffer, filepathBuffer) => {
  debug.verbose('called');

  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  debug.debug('decoded queryId', queryId);

  // check if queryId exists in registeredCallbacks singleton, if no stop logic
  const callback = registeredCallbacks.get(queryId);
  if (!callback) {
    return undefined;
  }
  // deprotobufferize domains
  const filepath = decode('dc.dataControllerUtils.String', filepathBuffer).string;

  // forward to client
  return websocketHandler(globalConstants.EVENT_FILEPATH_DATA, filepath, queryId);
};

const onFilepathData = (queryIdBuffer, filepathBuffer) => {
  filepathData(sendToMain, queryIdBuffer, filepathBuffer);
};

module.exports = {
  onFilepathData,
  filepathData,
};