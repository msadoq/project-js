const { addTimeline, removeTimeline } = require('./utils');

function PlotView(configuration) {
  this.spark = configuration.spark;
  this.conf = configuration.conf;
  this.identity = configuration.identity;
  if (!this.conf.plotViewEntryPoints) this.conf.plotViewEntryPoints = [];
}

PlotView.prototype.isType = function (type) {
  return type === 'plot';
};

PlotView.prototype.onTimebarUpdate = function (cmdList) {
  // TODO
  console.log('onTimebarUpdate plot', cmdList);
  //this.spark.write({});
  for (key in cmdList) {
    switch (key) {
      case 'visuWindowUpdate':
        const visuUpd = cmdList[key];
        if (visuUpd.slideWindow) {

        }
        if (visuUpd.extUpperBound) {

        }
        if (visuUpd.masterId) {

        }
        if (visuUpd.offsetFromUTC) {

        }
        if (visuUpd.current) {

        }
        break;
      case 'modeUpdate':
        break;
      case 'playingStateUpdate':
        break;
      case 'speedUpdate':
        break;
      case 'timeSpecUpdate':
        break;
      case 'timelineUpdate':
        break;
      case 'timelineAdded':
        // Add subscription if connected data has wilcard on timeline
        this.conf.plotViewEntryPoints.forEach((element, index, array) => {
          addTimeline(element.connectedDataX);
          addTimeline(element.connectedDataY);
        });
        break;
      case 'timelineRemoved':
        // Remove subscriptions with concerned timeline
        this.conf.plotViewEntryPoints.forEach((element, index, array) => {
          removeTimeline(element.connectedDataX);
          removeTimeline(element.connectedDataY);
        });
        break;
      default:
        console.log(key);
    }
  }
};

PlotView.prototype.onDcData = function (payloads) {
  // TODO
  console.log('onDcData', payloads);
};

module.exports = PlotView;
