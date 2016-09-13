const debug = require('../io/debug')('controllers:onDcPull');
const async = require('async');
const _ = require('lodash');
const { decode } = require('../protobuf');
const cacheJsonModel = require('../models/cacheJson');
const viewsModel = require('../models/views');
const onDcData = require('./onDcData');

// TODO : test

/**
 * Controller that listen for DC incoming NewDataMessage
 * @param buffer
 */
module.exports = (header, buffer) => {
  debug.verbose('called');
};
