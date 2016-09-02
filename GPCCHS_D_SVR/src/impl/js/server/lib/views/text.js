function TextView(configuration) {
  this.spark = configuration.spark;
}

TextView.prototype.isType = function (type) {
  return type === 'text';
};

TextView.prototype.onTimebarUpdate = function (timebar) {
  // TODO
  console.log('onTimebarUpdate', timebar);
};

TextView.prototype.onDcData = function (payloads) {
  // TODO
  console.log('onDcData', payloads);
};

module.exports = TextView;
