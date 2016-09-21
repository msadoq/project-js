const {
  addTimeline,
  removeTimeline,
  getTimelineSessionId,
  getTimelineByName,
  getTimelineById,
  updateDataFromTl,
  updateData,
} = require('../../lib/utils/timebar');
const getTb = require('../../lib/timeBar/index').getTimebar;
// const formula = require('../../lib/utils/formula');
const _ = require('lodash');

function TextView(configuration) {
  this.spark = configuration.spark;
  this.configuration = configuration.configuration;
  this.identity = configuration.identity;
  if (!this.configuration.textViewEntryPoints) {
    this.configuration.textViewEntryPoints = [];
  }
}

TextView.prototype.type = function () {
  return 'text';
};

TextView.prototype.isType = function (type) {
  return type === 'text';
};

TextView.prototype.onTimebarUpdate = function (cmdList) {
  // // TODO
  // console.log('onTimebarUpdate text', cmdList);
  // const tb = getTb();
  // console.log('tb:',tb);
  //
  // // for (key in cmdList) {
  // _.each(cmdList, (curKey, key) => {
  //   // const curKey = cmdList[key] ;
  //   switch (key) {
  //     case 'visuWindowUpdate':
  //       // Reacts only on current time update
  //       if (curKey.current) {
  //         this.conf.textViewEntryPoints.forEach(element => {
  //           // TODO query
  //           const visuBounds = {
  //             lower: cmdList.visuWindowUpdate.current,
  //             upper: cmdList.visuWindowUpdate.current,
  //           };
  //           const dataId = formula(element.connectedData.formula);
  //           updateData(tb.data.timeLines, element.connectedData, visuBounds, dataId,
  //                      this.spark.write);
  //         });
  //       }
  //       break;
  //     case 'timelineUpdate':
  //       // masterId & offsetFromUTC
  //       // timeLines : name, offset, kind, sessionId, dsPath, rsPath
  //       // Updates are stored by timeline id
  //       // for (tlId in curKey.timeLines) {
  //       _.each(curKey.timeLines, tlId => {
  //         this.conf.textViewEntryPoints.forEach(element => {
  //           if (element.connectedData.timeline === tlId) {
  //             // TODO make query
  //           }
  //         });
  //       });
  //       break;
  //     case 'modeUpdate': // for optim
  //       break;
  //     case 'playingStateUpdate': // for optim
  //       break;
  //     case 'speedUpdate': // for optim
  //       break;
  //     case 'timeSpecUpdate': // Not implemented yet
  //       break;
  //     case 'timelineAdded':
  //       this.conf.textViewEntryPoints.forEach((element) => {
  //         addTimeline(element.connectedData);
  //       });
  //       break;
  //     case 'timelineRemoved':
  //       this.conf.textViewEntryPoints.forEach((element) => {
  //         removeTimeline(element.connectedData);
  //       });
  //       break;
  //     default:
  //       console.log(key);
  //   }
  // });
}

TextView.prototype.onNewDataMessage = function (payloads) {
  // TODO
  console.log('onNewDataMessage', payloads);
};

module.exports = TextView;
