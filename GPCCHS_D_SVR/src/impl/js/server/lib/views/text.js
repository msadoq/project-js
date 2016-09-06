const { addTimeline, removeTimeline } = require('./utils');

function TextView(configuration) {
  this.spark = configuration.spark;
  this.conf = configuration.conf;
  this.identity = configuration.identity;
  if (!this.conf.textViewEntryPoints) this.conf.textViewEntryPoints = [];
}

TextView.prototype.isType = function (type) {
  return type === 'text';
};

TextView.prototype.onTimebarUpdate = function (cmdList) {
  // TODO
  console.log('onTimebarUpdate text', cmdList);
  for (key in cmdList) {
    const curKey = cmdList[key] ;
    switch (key) {
      case 'visuWindowUpdate':
        // Reacts only on current time update
        if (curKey.current) {
          this.conf.textViewEntryPoints.forEach((element, index, array) => {
            // TODO update subscription
          });
          console.log('current');
        }
        break;
      case 'timelineUpdate':
        // masterId & offsetFromUTC
        // timeLines : name, offset, kind, sessionId, dsPath, rsPath
        // Updates are stored by timeline id
        for (tlId in curKey.timeLines) {
          this.conf.textViewEntryPoints.forEach((element, index, array)=> {
            if (element.connectedData.timeline === tlId) {
              // TODO update subscription
            }
          });
        }
        break;
      case 'modeUpdate':
        break;
      case 'playingStateUpdate':
        // TODO Update subscription
        break;
      case 'speedUpdate':
        // TODO Update subscription ?
        break;
      case 'timeSpecUpdate':
        break;
      case 'timelineAdded':
        this.conf.textViewEntryPoints.forEach((element, index, array) => {
          addTimeline(element.connectedData);
        });
        break;
      case 'timelineRemoved':
        this.conf.textViewEntryPoints.forEach((element, index, array) => {
          removeTimeline(element.connectedData);
        });
        break;
      default:
        console.log(key);
    }
  }
};

TextView.prototype.onDcData = function (payloads) {
  // TODO
  console.log('onDcData', payloads);
};

module.exports = TextView;
