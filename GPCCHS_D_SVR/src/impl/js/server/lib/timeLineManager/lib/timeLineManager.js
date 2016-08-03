
const { timeLinePullSocket } = require('../../io/zmq');
const { cacheWebSocket } = require('../../io/socket.io');
const debug = require('../../io/debug')('timeLineManager:timeLineManager');
const webSocket = cacheWebSocket;

// Schema validator module
const Ajv = require('ajv');
const ajv = Ajv({allErrors: true});

// Get schema in other file.js
const { timeBarSchema } = require('../schema/timeBarSchema');
// Apply timeBarSchema
const validate = ajv.compile(timeBarSchema);
// Compliance between schema and data
function testJson(data) {
  let valid = validate(data);
  if (!valid) {
    let str = ajv.errorsText(validate.errors, { separator: '\n' });
    // Todo : Throw error
    debug.debug('Parsing error: \n'+str);
  }
}

// TB associated with the process
const associatedTimebar ;

//*************** Time Bar initialization
const onInit = (timebar) => {
  const timebarJson = JSON.parse(timebar);
  // Check timeBar ID to verify info are expected : décommenter qd ok
  associatedTimebar.id = timebarJson.id;
  // if (timebarJson.id !== associatedTimebar.id)  return;

  associatedTimebar = timebarJson.timeBar;
  // Default value
  if (!associatedTimebar.state) { associatedTimebar.state = "pause"; }
  if (!associatedTimebar.speed) { associatedTimebar.speed = 1.; }
  if (!associatedTimebar.realTime) { associatedTimebar.realTime = false; }
  if (associatedTimebar.timeSpec != "LocalTime") { /*todo : throw error */}
  if (!associatedTimebar.offsetFromUTC) { associatedTimebar.offsetFromUTC = 0; }

}

//*************** Time Bar update
const onUpdateTimebar = (timebar) => {
  const timebarJson = timebar.parse(timebar);
  // Check timeBar ID to verify info are expected
  if (timebarJson.timeBar.id !== associatedTimebar.id)  return;

  // Copy timeBar properties
  Object.assign(associatedTimebar,timebarJson.timeBar);

  const timeRangeConfiguration = {
    "type": 'xExtents',
    "lower": associatedTimebar.visuWindow.lower,
    "upper": associatedTimebar.visuWindow.upper
  };
  const currentTimeConfiguration = {
    "type": 'vLineMarkerConfiguration',
    "color": 'green',
    "current": associatedTimebar.visuWindow.current,
    "unit": 'time',
    "state": associatedTimebar.state,
    "speed":associatedTimebar.speed
  };

  const visuModeConfiguration ;
  switch (associatedTimebar.mode) {
    case "Normal":
      visuModeConfiguration = null;
      break;
    case "Extended":
      visuModeConfiguration = {
        "type": "visuMode",
        "mode": "Extended",
        "extUpperBound": associatedTimebar.extUpperBound
      };
      break;
    case "Sliding":
      visuModeConfiguration = {
        "type": "visuMode",
        "mode": "Sliding",
        "lower": associatedTimebar.slideWindow.lower,
        "upper": associatedTimebar.slideWindow.upper
      };
      break;
    default:
      visuModeConfiguration = null;
    }

    const timeProperties = {
      "type" : "timeProps",
      "realTime": associatedTimebar.realTime,
      "timeSpec": associatedTimebar.timeSpec,
      "offsetFromUTC": associatedTimebar.offsetFromUTC,
      "masterId": associatedTimebar.masterId
    }

  const timebarMessage = Object.assign({},timeRangeConfiguration,
    currentTimeConfiguration,visuModeConfiguration, timeProperties);

  webSocket().emit('timebar',timebarMessage);
}

//*************** Time line addition
const onNewTimeLine = (timeline) {
  const timelineJson = JSON.parse(timeline);
  // Check existence of ID
  let id = timelineJson.timeline.id;
  if (!id) {
    debug.debug(`Error TimeLine addition: No ID`);
    return;
  }
  // Check unicity of ID
  for (let i = 0; i < associatedTimebar.timelines.length; i++) {
    if (associatedTimebar.timelines[i].id == id) {
      debug.debug(`Error TimeLine addition: ID not unique `+id);
      return ;
    }
  }

  associatedTimebar.timelines.push(timelineJson.timeline);
  webSocket().emit('newTimeline',timelineJson.timeline);
}

//*************** Time line deletion
const onRemoveTimeline = (timelineId) {
  // find timeline ID
  for (let i = 0; i < associatedTimebar.timelines.length; i++) {
    if (associatedTimebar.timelines[i].id == timelineId) {
      delete associatedTimebar.timelines[i];
      // Sending info to views
      webSocket().emit('removeTimeline',timelineId);
      return ;
    }
  }
  debug.debug("onRemoveTimeline : Error : TimelineId unknown : "+timelineId);
}


//*************** Time line deletion
const onUpdateTimeline = (timeline) {
  const timelineJson = JSON.parse(timeline);
  const timelineId = timelineJson.timeline.id;
  // find timeline ID
  for (let i = 0; i < associatedTimebar.timelines.length; i++) {
    if (associatedTimebar.timelines[i].id == timelineId) {
      // Sending info to views
      webSocket().emit('updateTimeline',timelineJson.timeline);
      // Update timeline parameters
      Object.assign(associatedTimebar.timelines[i],timelineJson.timeline);
      return ;
    }
  }
  debug.debug("onUpdateTimeline : Error : TimelineId unknown : "+timelineId);
}

// Sending time bar infos when a new connection is established
const onOpen = (webSocket) {
  webSocket.emit("timebarInitialization",associatedTimebar);
}

const init = () => {
  debug.info('INIT TimeLine Manager Message Reception');
  timeLinePullSOcket.on('timebarInit',onInit);
  timeLinePullSOcket.on('newTimeline',onNewTimeLine);
  timeLinePullSOcket.on('removeTimeline',onRemoveTimeline);
  timeLinePullSOcket.on('updateTimeline',onUpdateTimeline);
  timeLinePullSOcket.on('updateTimebar',onUpdateTimebar);
  webSocket.on('connection',onOpen);
};

module.exports = { init };
