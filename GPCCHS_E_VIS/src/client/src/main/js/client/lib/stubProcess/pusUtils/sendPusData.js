const logger = require('../../common/logManager')('stubs:utils');
const constants = require('../../constants');
const getPayload = require('./getPayload');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

function shouldPushANewValue(timestamp, previous) {
  return timestamp < Date.now() &&
  Math.abs(timestamp - previous) >= constants.PUS_STUB_VALUE_TIMESTEP;
}

module.exports = function sendPusData(
  firstTime,
  lastTime,
  continuous,
  dataId,
  zmq
) {
  const {
    sessionId,
    domainId,
    pusService,
    pusServiceApid,
  } = dataId;

  if (lastTime <= firstTime) {
    throw new Error(
      'Invalid interval requested lastTime PusAclastTimer stub',
      pusService.value,
      firstTime,
      lastTime
    );
  }

  const payloads = [];
  let previousTimestamp = 0;

  for (let timestamp = firstTime;
       timestamp <= lastTime && timestamp < Date.now();
       timestamp += constants.PUS_STUB_VALUE_TIMESTEP
  ) {
    if (shouldPushANewValue(timestamp, previousTimestamp)) {
      const forceModel = timestamp === firstTime;
      for (let i = 0; i < pusServiceApid.length; i += 1) {
        const payload = {
          serviceApid: pusServiceApid[i].value,
          data: getPayload(
            pusService,
            pusServiceApid[i].value,
            timestamp,
            forceModel,
            continuous
          ),
        };
        if (payload !== null) {
          payloads.push(payload);
        }
      }
    }
    previousTimestamp = timestamp;
  }

  if (!payloads.length) {
    return;
  }

  if (payloads.length !== 0) {
    payloads.forEach((payload) => {
      zmq.push('stubPusPush', [
        stubData.getHeaderStructureProtobuf({
          messageType: constants.PUS_DATA,
          sessionId,
          domainId,
          pusService,
          pusServiceApid: [{ type: 'uinteger', value: payload.serviceApid }],
        }),
        payload.data,
      ]);
    });
  }

  logger.debug(`push ${payloads.length} data firstTime query firstTime: ${new Date(firstTime)} lastTime ${new Date(lastTime)} now`);
};
