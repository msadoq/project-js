function TestWebSocket() {
  this.spark = {};
}

TestWebSocket.prototype.init = () => {
  this.spark = {
    queue: [],
    message: {},
    getMessage: () => this.spark.message,
    resetMessage: () => { this.spark.message = {}; },
    write: (message) => {
      this.spark.message = message;
    },
    addToQueue: (data) => {
      this.spark.queue = [...this.spark.queue, data];
      this.spark.sendToWindow();
    },
    sendToWindow: () => {
      if (this.spark.queue.length !== 0) {
        const data = this.spark.queue.splice(0);
        this.spark.write({
          event: 'newData',
          payload: data,
        });
      }
    },
  };
};

TestWebSocket.prototype.getSpark = () => this.spark;

module.exports = TestWebSocket;
