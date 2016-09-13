const JS = require('../protoFile/logbookEvent.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const LogbookEvent = JS.LogbookEvent;

exports.binToJson = (payload) => {
  const decoded = LogbookEvent.decode(payload);
  const logbookEvent = {
    eventDate: decoded.eventDate.value,    systemDate: decoded.systemDate.value,,,    mission: decoded.mission.value,    satellite: decoded.satellite.value,    specificAttributes: decoded.specificAttributes.value,    producer: decoded.producer.value
  };
  return logbookEvent;
};
