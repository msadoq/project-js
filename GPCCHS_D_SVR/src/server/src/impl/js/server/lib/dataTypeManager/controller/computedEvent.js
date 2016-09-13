const JS = require('../protoFile/computedEvent.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const ComputedEvent = JS.ComputedEvent;

exports.binToJson = (payload) => {
  const decoded = ComputedEvent.decode(payload);
  const computedEvent = {
    eventDate: decoded.eventDate.value,    systemDate: decoded.systemDate.value,    eventClass: decoded.eventClass,    source: decoded.source.value,    mission: decoded.mission.value,    satellite: decoded.satellite.value,    specificAttributes: decoded.specificAttributes.value,    producer: decoded.producer.value
  };
  return computedEvent;
};
