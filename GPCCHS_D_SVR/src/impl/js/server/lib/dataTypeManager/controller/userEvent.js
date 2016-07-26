const JS = require('../protoFile/userEvent.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const UserEvent = JS.UserEvent;

exports.binToJson = (payload) => {
  const decoded = UserEvent.decode(payload);
  const userEvent = {
    eventDate: decoded.eventDate.value,    systemDate: decoded.systemDate.value,    userProfile: decoded.userProfile.value,    specificAttributes: decoded.specificAttributes.value,    mission: decoded.mission.value,    satellite: decoded.satellite.value,    producer: decoded.producer.value
  };
  return userEvent;
};
