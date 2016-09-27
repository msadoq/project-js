const debug = require('../../io/debug')('stubs:testViewAdapter');
const _ = require('lodash');

function TestView(configuration) {
  this.spark = configuration.spark;
  this.conf = configuration.conf;
  this.identity = configuration.identity;
}

TestView.prototype.type = function () {
  return 'test';
};

TestView.prototype.isType = function (type) {
  return type === 'test';
};

TestView.prototype.onTimebarUpdate = function (cmdList) {
  // TODO
};

TestView.prototype.onNewData = function (dataId, payload) {
  debug.debug('onNewData');
  const payloads = (_.isArray(payload)) ? payload : [payload];
  debug.debug(this.spark.addToQueue.toString());
  this.spark.addToQueue({ dataId, payloads });
  debug.debug(this.spark.queue);
};

module.exports = TestView;
