const searchInterval = require('../subscriptionManager/intervals');
const debug = require('../io/debug')('views:utils');
const subscriptionModel = require('../models/subscriptions');
const cacheJson = require('../models/cacheJson');

function addTimeline(connectedData, tlId) {
  connectedData.foreach((element, index, array) => {
    if (element.timeline.contains('*')) {
      // Add subscription
    }
  });
}

function removeTimeline(connectedData, tlId) {
  connectedData.foreach((element, index, array) => {
    if (element.timeline.contains('*')) {
      // remove subscription
    } else if (element.timeline === tlId) {
      // remove subscription
    }
  });
}

function getTimelineByName(timelines, name) {
  return timelines.find((element, index, array) => {
    if (element.name === name) return true;
    return false;
  });
}
function getTimelineById(timelines, id) {
  return timelines.find((element, index, array) => {
    if (element.id === id) return true;
    return false;
  });
}

function getTimelineSessionId(timeline) {
  switch (timeline.kind) {
    case 'Session':
      return timeline.sessionId;
    case 'Dataset':
      return timeline.dsPath;
    case 'Recordset':
      return timeline.rsPath;
    default:
      return undefined;
  }
}

function queryParam(connectedData, timeline, visuLower, visuUpper) {
  return {
    dataFullName: connectedData.formula,
    sessionId: getTimelineSessionId(timeline),
    domainId: connectedData.domainId,
    visuWindow: {
      lower: visuLower + timeline.offset,
      upper: visuUpper + timeline.offset,
    },
  };
}
// TODO
function addQuery(element, index, array) {
  // Each element in an interval

}
function updateDataFromTl(timeline, connectedData, visuBounds, dataId, callback) {
  // update parameter
  searchInterval(
    subscriptionModel,
    queryParam(connectedData, timeline, visuBounds.lower, visuBounds.upper),
    (err, intervals) => {
      if (err) {
        debug.debug('Unable to update data ', dataId);
        return;
      }
      if (intervals.length > 0) {
        // Query needed on intervals
        intervals.forEach(addQuery);
      }
      // Ask data to cache for whole interval
      const data = cacheJson.findByInterval(dataId, visuBounds.lower, visuBounds.upper);
      debug.debug('---------------data', data);
      callback(data);
    }
  );
}

// TODO prendre en compte le wilcard
function updateData(timelines, connectedData, visuBounds, dataId, callback) {
  const tl = getTimelineByName(timelines, connectedData.timeLine);
  debug.debug('tl dans utils:', tl);
  if (tl) {
    // update parameter
    return updateDataFromTl(tl, connectedData, visuBounds, dataId, callback);
  }
  return undefined;
}


module.exports = {
  addTimeline,
  removeTimeline,
  getTimelineSessionId,
  getTimelineByName,
  getTimelineById,
  updateDataFromTl,
  updateData,
}
