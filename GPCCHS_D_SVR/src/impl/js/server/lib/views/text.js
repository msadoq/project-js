const {
  addTimeline,
  removeTimeline,
  getTimelineSessionId,
  getTimelineByName,
  getTimelineById,
  updateDataFromTl,
  updateData,
} = require('./utils');
const getTb = require('../timeBar/index').get;
const parseDataFullName = require('../utils/parseDataFullName');

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
  const tb = getTb();
  console.log('tb:',tb);

  for (key in cmdList) {
    const curKey = cmdList[key] ;
    switch (key) {
      case 'visuWindowUpdate':
        // Reacts only on current time update
        if (curKey.current) {
          this.conf.textViewEntryPoints.forEach((element, index, array) => {
            // TODO query
            const visuBounds = {
              lower: cmdList.visuWindowUpdate.current,
              upper: cmdList.visuWindowUpdate.current,
            };
            const dataId = parseDataFullName(element.connectedData.formula);
            updateData(tb.data.timeLines, element.connectedData, visuBounds, dataId,
                       this.spark.write);
          });
        }
        break;
      case 'timelineUpdate':
        // masterId & offsetFromUTC
        // timeLines : name, offset, kind, sessionId, dsPath, rsPath
        // Updates are stored by timeline id
        for (tlId in curKey.timeLines) {
          this.conf.textViewEntryPoints.forEach((element, index, array)=> {
            if (element.connectedData.timeline === tlId) {
              // TODO make query
            }
          });
        }
        break;
      case 'modeUpdate': // for optim
        break;
      case 'playingStateUpdate': // for optim
        break;
      case 'speedUpdate': // for optim
        break;
      case 'timeSpecUpdate': // Not implemented yet
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
