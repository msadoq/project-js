const debug = require('../../lib/io/debug')('views:plot');
const _ = require('lodash');

function PlotView(configuration) {
  this.spark = configuration.spark;
  this.configuration = configuration.configuration;
  this.identity = configuration.identity;
}

PlotView.prototype.type = 'plot';

PlotView.prototype.setConfiguration = function (configuration) {
  this.configuration = configuration; // TODO move in abstract and test
};

PlotView.prototype.setSpark = function (spark) {
  this.spark = spark; // TODO move in abstract and test
};

PlotView.prototype.onNewData = function (timebars, dataId, payload) {
  // TODO is this view concerned by this dataId?
  // TODO is this payload in currently displayed interval
  // TODO apply filter
  // TODO prepare message (select field and compute)

  debug.debug('onNewData');
  const payloads = (_.isArray(payload)) ? payload : [payload];

  this.spark.addToQueue({ dataId, payloads });
};

module.exports = PlotView;
