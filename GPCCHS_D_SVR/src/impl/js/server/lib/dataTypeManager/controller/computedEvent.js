const JS = require('../protoFile/computedEvent.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const ComputedEvent = JS.ComputedEvent;

exports.binToJson = (payload) => {
  const decoded = ComputedEvent.decode(payload);
  const computedEvent = {
    eventDate: decoded.eventDate.value,    eventClass: decoded.eventClass,    systemDate: decoded.systemDate.value,    mission: decoded.mission.value,    source: decoded.source.value,    satellite: decoded.satellite.value,    specificAttributes: decoded.specificAttributes.value,    producer: decoded.producer.value
  };
  return computedEvent;
};
