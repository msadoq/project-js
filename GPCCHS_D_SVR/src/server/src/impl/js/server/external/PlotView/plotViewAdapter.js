const debug = require('../../lib/io/debug')('views:plot');
const _ = require('lodash');
const serializeDataId = require('../../lib/models/getLocalId');

function PlotView(configuration) {
  this.spark = configuration.spark;
  this.identity = configuration.identity;
  this.connectedData = configuration.connectedData;
  // cDatum : { serializedDataId, interval: {lower, upper}, localId}
}

PlotView.prototype.type = 'plot';

PlotView.prototype.setConfiguration = function (configuration) {
  this.configuration = configuration; // TODO move in abstract and test
};

PlotView.prototype.setSpark = function (spark) {
  this.spark = spark; // TODO move in abstract and test
};

PlotView.prototype.onNewData = function (timebars, remoteId, payload) {
  debug.debug('/////////////////////////onNewData');
  const cData = this.connectedData[remoteId];
  if (!cData) {
    return;
  }

  // Check if this payload in currently displayed interval
  let { lower, upper } = timebars[cData.timebarId].visuWindow;
  const payloadForView = {};
  _.each(cData.localIds, (locId, key) => {
    // Apply offset
    lower -= locId.offset;
    upper -= locId.offset;
    let name;
    name.concat(remoteId, ':', key);
    _.each(payload, p => {
      if (p.timestamp >= lower && p.timestamp <= upper) {
        const val = p.payload[locId.field];
        if (val) {
          (payloadForView[name] || (payloadForView[name] = [])).push(
            { timestamp: p.timestamp, value: val });
        }
      }
    });
  });

  if (Object.getOwnPropertyNames(payloadForView).length === 0) {
    return;
  }

  // Order values by timestamp
  _.each(payloadForView, rId => {
    _.orderBy(rId, ['timestamp'], ['asc']);
  });

  this.spark.addToQueue({ remoteId, payloadForView });
};

module.exports = PlotView;
