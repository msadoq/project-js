const debug = require('../../lib/io/debug')('views:text');
const _ = require('lodash');

function TextView(configuration) {
  this.spark = configuration.spark;
  this.configuration = configuration.configuration;
  this.identity = configuration.identity;
}

TextView.prototype.type = 'text';

TextView.prototype.setConfiguration = function (configuration) {
  this.configuration = configuration; // TODO move in abstract and test
};

TextView.prototype.setSpark = function (spark) {
  this.spark = spark; // TODO move in abstract and test
};

TextView.prototype.onNewData = function (timebars, dataId, payload) {
  // TODO is this view concerned by this dataId?
  // TODO is this payload in currently displayed interval
  // TODO apply filter
  // TODO prepare message (select field and compute)

  debug.debug('onNewData');
  const payloads = (_.isArray(payload)) ? payload : [payload];

  this.spark.addToQueue({ dataId, payloads });
};

module.exports = TextView;
