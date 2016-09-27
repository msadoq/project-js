const sendToWindow = require('../utils/sendToWindow');

function TestWebSocket() {
  this.spark = {};
}

TestWebSocket.prototype.init = () => {
  this.spark = {
    message: {},
    getMessage: () => this.spark.message,
    resetMessage: () => { this.spark.message = {}; },
    write: (message) => {
      this.spark.message = message;
    },
    sendToWindow: data => sendToWindow(this.spark, data),
  };
};

TestWebSocket.prototype.getSpark = () => this.spark;

module.exports = TestWebSocket;
