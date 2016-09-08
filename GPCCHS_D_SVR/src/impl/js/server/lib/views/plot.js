const debug = require('../io/debug')('views:plot');
const {
  addTimeline,
  removeTimeline,
//  getTimelineSessionId,
//  getTimelineByName,
  getTimelineById,
  updateDataFromTl,
  updateData,
} = require('./utils');
const getTb = require('../timeBar/index').get;
const parseDataFullName = require('../utils/parseDataFullName');

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
  const timebar = getTb();
  //this.spark.write({});
  for (key in cmdList) {
    console.log('key:', key);
    switch (key) {
      case 'visuWindowUpdate':
        const visuUpd = cmdList[key];
        console.log('visuUpd', visuUpd);
        // if (visuUpd.slideWindow) {
        //   if (visuUpd.slideWindow.lower) {}
        //   if (visuUpd.slideWindow.upper) {}
        // }
        // if (visuUpd.extUpperBound) {}
        // if (visuUpd.masterId) {}
        // if (visuUpd.offsetFromUTC) {}
        if (visuUpd.current) {
          // TODO update plot view for current line
          this.spark.write({ currentUpdate: visuUpd.current });
        }
        if (visuUpd.bounds) {
          // TODO update plot view for axis
          // update data
          this.conf.plotViewEntryPoints.forEach((element, index, array) => {
            // X axis
            const dataIdX = parseDataFullName(element.connectedDataX.formula);
            updateData(timebar.data.timeLines, element.connectedDataX, visuUpd.bounds,
                       dataIdX, this.spark.write);
            // Y axis
            const dataIdY = parseDataFullName(element.connectedDataY.formula);
            updateData(timebar.data.timeLines, element.connectedDataY, visuUpd.bounds,
                       dataIdY, this.spark.write);
          });
        }
        break;
      case 'modeUpdate':    // for optim
        break;
      case 'playingStateUpdate': // for optim
        break;
      case 'speedUpdate': // for optim
        break;
      case 'timeSpecUpdate': // Not implemented yet
        break;
      case 'timelineUpdate':
        //Check if tl is used
        const tlUpdate = cmdList.timelineUpdate.timeLines;
        if (tlUpdate) {
          for (tlId in tlUpdate) {
            // if only name has changed, nothing to do except modifiing EP data
            if (Object.keys(tlId) !== ['name']) {
              const tl = getTimelineById(timebar.data.timeLines, tlId);
              if (tl) {
                // update data
                this.conf.plotViewEntryPoints.forEach((element, index, array) => {
                  // X axis TODO vérifier si id ou nom qui est enregistré dans EP
                  if (element.connectedDataX.timebar === tl.name) {
                    const dataIdX = parseDataFullName(element.connectedDataX.formula);
                    updateDataFromTl(tl, element.connectedDataX, visuUpd.bounds, dataIdX,
                                     this.spark.write);
                    // send data to socket
                  }
                  // Y axis
                  if (element.connectedDataX.timebar === tl.name) {
                    const dataIdY = parseDataFullName(element.connectedDataY.formula);
                    updateDataFromTl(tl, element.connectedDataY, visuUpd.bounds, dataIdY,
                                     this.spark.write);
                  }
                });
              }
            }
          }
        }
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
    }
  }
};

PlotView.prototype.onDcData = function (payloads) {
  // TODO
  console.log('onDcData', payloads);
};

module.exports = PlotView;
