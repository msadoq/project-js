const _each = require('lodash/each');
const _random = require('lodash/random');
const globalConstants = require('../../constants');
const stubData = require('common/protobuf/stubs');
const getPayload = require('./getPayload');

const header = stubData.getTimebasedPubSubDataHeaderProtobuf();

function getPayloads(comObject, parameterName) {
  const payloads = [];
  for (let i = 0; i < _random(1, globalConstants.DC_STUB_MAX_SUBSCRIPTION_VALUES); i += 1) {
    payloads.push(getPayload(Date.now(), comObject, parameterName));
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

  _each(getPayloads(dataId.comObject, dataId.parameterName), (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });

  zmq.push('stubData', buffer);
};
