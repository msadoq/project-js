const debug = require('../../io/debug')('stubs:testViewAdapter');

function TestView(configuration) {
  this.spark = configuration.spark;
  this.conf = configuration.conf;
  this.identity = configuration.identity;
  this.payloads = [];
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

TestView.prototype.onNewDataMessage = function (dataId, payloads) {
  debug.debug('onNewDataMessage');
  this.payloads.push({ dataId, payloads });
};

module.exports = TestView;
