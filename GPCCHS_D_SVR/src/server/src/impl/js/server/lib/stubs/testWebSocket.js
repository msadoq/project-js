const _ = require('lodash');

function TestWebSocket() {
  this.spark = {};
}

TestWebSocket.prototype.init = () => {
  this.spark = {
    queue: {},
    message: {},
    getMessage: () => this.spark.message,
    resetMessage: () => { this.spark.message = {}; },
    write: (message) => {
      this.spark.message = message;
    },
    addToQueue: (remoteId, payload) => {
      const previous = _.get(this.spark, ['queue', remoteId]);
      if (typeof previous === 'undefined') {
        _.set(this.spark, ['queue', remoteId], payload);
      } else {
        _.set(this.spark, ['queue', remoteId], _.concat(previous, payload));
      }
      this.spark.sendToWindow();
    },
    sendToWindow: () => {
      this.spark.write({
        event: 'newData',
        payload: this.spark.queue,
      });
      this.spark.queue = {};
    },
  };
};

TestWebSocket.prototype.getSpark = () => this.spark;

module.exports = TestWebSocket;
