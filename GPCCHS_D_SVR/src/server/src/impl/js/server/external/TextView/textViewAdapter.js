const debug = require('../../lib/io/debug')('views:text');
const _ = require('lodash');
const serializeDataId = require('../../lib/models/getLocalId');


function TextView(configuration) {
  this.spark = configuration.spark;
  this.configuration = configuration.configuration;
  this.identity = configuration.identity;
  this.cDatum = configuration.cDatum;
}

TextView.prototype.type = 'text';

TextView.prototype.setConfiguration = function (configuration) {
  this.configuration = configuration; // TODO move in abstract and test
};

TextView.prototype.setSpark = function (spark) {
  this.spark = spark; // TODO move in abstract and test
};

TextView.prototype.onNewData = function (timebars, remoteId, payload) {
  // TODO apply filter ?
  const cData = this.connectedData[remoteId];
  if (!cData) {
    return;
  }

  // Check if this payload in currently displayed interval
  let { current } = timebars[cData.timebarId].visuWindow;
  const payloadForView = {};
  _.each(cData.localIds, (locId, key) => {
    // Apply offset
    current -= locId.offset;
    let name;
    name.concat(remoteId, ':', key);
    _.each(payload, p => {
      // Get all values between current time and a minute before
      if (p.timestamp === current || p.timestamp >= current - 60000) {
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

module.exports = TextView;
