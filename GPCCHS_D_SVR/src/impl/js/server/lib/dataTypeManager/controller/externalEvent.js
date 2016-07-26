const JS = require('../protoFile/externalEvent.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const ExternalEvent = JS.ExternalEvent;

exports.binToJson = (payload) => {
  const decoded = ExternalEvent.decode(payload);
  const externalEvent = {
    eventDate: decoded.eventDate.value,    systemDate: decoded.systemDate.value,    specificAttributes: decoded.specificAttributes.value,    mission: decoded.mission.value,    satellite: decoded.satellite.value,    producer: decoded.producer.value
  };
  return externalEvent;
};
