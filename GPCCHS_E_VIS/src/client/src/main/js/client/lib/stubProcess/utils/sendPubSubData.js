const _each = require('lodash/each');
const _random = require('lodash/random');
const constants = require('../../constants');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();
const getPayload = require('./getPayload');

const header = stubData.getTimebasedPubSubDataHeaderProtobuf();

function getPayloads(comObject, parameterName) {
  const payloads = [];
  for (let i = 0; i < _random(1, constants.DC_STUB_MAX_SUBSCRIPTION_VALUES); i += 1) {
    const payload = getPayload(Date.now(), comObject, parameterName);
    if (payload !== null) {
      payloads.push(payload);
    }
  }

  return payloads;
}

module.exports = (queryId, dataId, zmq) => {
  const buffer = [
    null,
    header,
    stubData.getStringProtobuf(queryId),
    stubData.getDataIdProtobuf(dataId),
  ];

  const payloads = getPayloads(dataId.comObject, dataId.parameterName);
  _each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });

  if (payloads.length !== 0) {
    zmq.push('stubData', buffer);
  }
};
