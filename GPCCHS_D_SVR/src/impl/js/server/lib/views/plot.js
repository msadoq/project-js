function PlotView(configuration) {
  this.spark = configuration.spark;
}

PlotView.prototype.isType = function (type) {
  return type === 'plot';
};

PlotView.prototype.onTimebarUpdate = function (timebar) {
  // TODO
  console.log('onTimebarUpdate', timebar);
};

PlotView.prototype.onDcData = function (payloads) {
  // TODO
  console.log('onDcData', payloads);
};

module.exports = PlotView;
