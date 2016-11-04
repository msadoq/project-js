/* eslint no-underscore-dangle:0 */
const _each = require('lodash/each');
const _random = require('lodash/random');
// eslint-disable-next-line import/no-extraneous-dependencies
const { constants: globalConstants } = require('common');
const stubData = require('../data');
const getPayload = require('./getPayload');

const header = stubData.getTimebasedPubSubDataHeaderProtobuf();

function getPayloads(parameterName) {
  const payloads = [];
  for (let i = 0; i < _random(0, globalConstants.DC_STUB_MAX_SUBSCRIPTION_VALUES); i += 1) {
    payloads.push(getPayload(Date.now(), parameterName));
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

  _each(getPayloads(dataId.parameterName), (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });

  zmq.push('stubData', buffer);
};
