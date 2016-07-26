const JS = require('../protoFile/logbookEvent.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const LogbookEvent = JS.LogbookEvent;

exports.binToJson = (payload) => {
  const decoded = LogbookEvent.decode(payload);
  const logbookEvent = {
    eventDate: decoded.eventDate.value,    user: decoded.user.value,    systemDate: decoded.systemDate.value,    userProfile: decoded.userProfile.value,    mission: decoded.mission.value,    specificAttributes: decoded.specificAttributes.value,    satellite: decoded.satellite.value,    producer: decoded.producer.value
  };
  return logbookEvent;
};
