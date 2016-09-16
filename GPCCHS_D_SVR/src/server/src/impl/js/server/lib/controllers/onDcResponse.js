const debug = require('../io/debug')('controllers:onDcResponse');
const async = require('async');
const _ = require('lodash');
const { decode } = require('../protobuf');

// TODO : test

let dcResponseCallbacks = {}; // { id: callback }

const getDcResponseCallbacks = () => dcResponseCallbacks;

const cleanDcResponseCallbacks = () => {
  dcResponseCallbacks = {};
};

const registerDcResponseCallbackOnHandler = (handler, id, callback) =>
  handler(() => {
    debug.debug('registerDcResponseCallback', callback, 'with id', id);
    dcResponseCallbacks[id] = callback;
  });

/**
 * Controller that listen for DC incoming Response
 * @param buffer
 */
const onDcResponse = buffer => {
  debug.verbose('called');

  let message;

  async.series([
    callback => {
      message = decode('dc.dataControllerUtils.DcResponse', buffer);
      return callback(null);
    },
    callback => {
      const dcResponseCallback = dcResponseCallbacks[message.id];
      if (dcResponseCallback === undefined) {
        return new Error('This DC response corresponds to no id');
      }

      dcResponseCallbacks = _.omit(dcResponseCallbacks, message.id);

      switch (message.status) {
        case 'OK':
          debug.debug('DC Response status OK');
          dcResponseCallback(null);
          break;
        case 'WARNING':
        case 'ERROR':
        default:
          debug.debug('DC Response status ERROR');
          dcResponseCallback(new Error(message.reason));
      }

      return callback(null);
    },
  ], err => (err ? debug.error(err) : debug.verbose('end')));
};

module.exports = {
  onDcResponse,
  getDcResponseCallbacks,
  cleanDcResponseCallbacks,
  registerDcResponseCallbackOnHandler,
};
