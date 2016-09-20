function TestSpark() {
  this.payload = {};
}

TestSpark.prototype.write = (payload) => {
  this.payload = payload;
};

TestSpark.prototype.getPayload = () => this.payload;
TestSpark.prototype.resetPayload = () => {
  this.payload = {};
};

module.exports = TestSpark;
