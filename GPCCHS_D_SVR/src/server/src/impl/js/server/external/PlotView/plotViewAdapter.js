const debug = require('../../lib/io/debug')('views:plot');
const {
  addTimeline,
  removeTimeline,
//  getTimelineSessionId,
//  getTimelineByName,
  getTimelineById,
  updateDataFromTl,
  updateData,
} = require('../../lib/utils/timebar');
const getTb = require('../../lib/timeBar/index').getTimebar;
const parseDataFullName = require('../../lib/utils/parseDataFullName');
const _ = require('lodash');

function PlotView(configuration) {
  this.spark = configuration.spark;
  this.conf = configuration.conf;
  this.identity = configuration.identity;
  if (!this.conf.plotViewEntryPoints) {
    this.conf.plotViewEntryPoints = [];
  }
}

PlotView.prototype.type = function () {
  return 'plot';
};

PlotView.prototype.isType = function (type) {
  return type === 'plot';
};

PlotView.prototype.onTimebarUpdate = function (cmdList) {
  // TODO
  debug.debug('onTimebarUpdate plot', cmdList);
  const timebar = getTb();
  _.each(cmdList, (value, key) => {
    console.log('key:', key);
    console.log('value', value);
    switch (key) {
      case 'visuWindowUpdate':
        // if (visuUpd.slideWindow) {
        //   if (visuUpd.slideWindow.lower) {}
        //   if (visuUpd.slideWindow.upper) {}
        // }
        // if (visuUpd.extUpperBound) {}
        // if (visuUpd.masterId) {}
        // if (visuUpd.offsetFromUTC) {}
        if (value.current) {
          // TODO update plot view for current line
          this.spark.write({ currentUpdate: value.current });
        }
        if (value.bounds) {
          // TODO update plot view for axis
          // update data
          this.conf.plotViewEntryPoints.forEach(element => {
            // X axis
            const dataIdX = parseDataFullName(element.connectedDataX.formula);
            updateData(timebar.timeLines, element.connectedDataX, value.bounds,
                       dataIdX, this.spark.write);
            // Y axis
            const dataIdY = parseDataFullName(element.connectedDataY.formula);
            updateData(timebar.timeLines, element.connectedDataY, value.bounds,
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
      case 'timelineUpdate': {
        // Check if tl is used
        // const tlUpdate = cmdList.timelineUpdate.timeLines;
        // if (tlUpdate) {
        //   for (tlId in tlUpdate) {
        _.each(cmdList.timelineUpdate.timeLines, (tlValue, tlId) => {
          // if only name has changed, nothing to do except modifiing EP data
          if (Object.keys(tlId) !== ['name']) {
            const tl = getTimelineById(timebar.timeLines, tlId);
            if (tl) {
              // update data
              this.conf.plotViewEntryPoints.forEach(element => {
                // X axis TODO vérifier si id ou nom qui est enregistré dans EP
                if (element.connectedDataX.timebar === tl.name) {
                  const dataIdX = parseDataFullName(element.connectedDataX.formula);
                  updateDataFromTl(tl, element.connectedDataX, value.bounds, dataIdX,
                                   this.spark.write);
                  // send data to socket
                }
                // Y axis
                if (element.connectedDataX.timebar === tl.name) {
                  const dataIdY = parseDataFullName(element.connectedDataY.formula);
                  updateDataFromTl(tl, element.connectedDataY, value.bounds, dataIdY,
                                   this.spark.write);
                }
              });
            }
          }
        });
        break;
      }
      case 'timelineAdded':
        // Add subscription if connected data has wilcard on timeline
        this.conf.plotViewEntryPoints.forEach(element => {
          addTimeline(element.connectedDataX);
          addTimeline(element.connectedDataY);
        });
        break;
      case 'timelineRemoved':
        // Remove subscriptions with concerned timeline
        this.conf.plotViewEntryPoints.forEach(element => {
          removeTimeline(element.connectedDataX);
          removeTimeline(element.connectedDataY);
        });
        break;
      default:
    }
  });
};

PlotView.prototype.onNewDataMessage = function (payloads) {
  // TODO
  debug.debug('onNewDataMessage', payloads);
};

module.exports = PlotView;
