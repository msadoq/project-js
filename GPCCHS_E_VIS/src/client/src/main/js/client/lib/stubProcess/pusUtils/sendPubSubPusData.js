const _each = require('lodash/each');
const _random = require('lodash/random');
const constants = require('../../constants');
const getPayload = require('./getPayload');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

function getPayloads(dataId) {
  const {
    pusService,
    pusServiceApid,
  } = dataId;
  const payloads = [];
  for (let i = 0; i < _random(1, constants.DC_STUB_MAX_SUBSCRIPTION_VALUES); i += 1) {
    const timestamp = Date.now();
    for (let j = 0; j < pusServiceApid.length; j += 1) {
      const payload = {
        serviceApid: pusServiceApid[i].value,
        data: getPayload(
          pusService,
          pusServiceApid[i].value,
          timestamp,
          false,
          false
        ),
      };
      if (payload !== null) {
        payloads.push(payload);
      }
    }
  }

  return payloads;
}

module.exports = (dataId, zmq) => {
  const {
    sessionId,
    domainId,
    pusService,
  } = dataId;
  const payloads = getPayloads(dataId);
  _each(payloads, (payload) => {
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
};
