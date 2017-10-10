import { encode } from '../../utils/adapters';

const _each = require('lodash/each');
const _random = require('lodash/random');
const constants = require('../../constants');
const stubs = require('../../utils/stubs');
const getPayload = require('./getPayload');

const stubData = stubs.getStubData();
const header = stubData.getTimebasedPubSubDataHeaderProtobuf();

function getPayloads(comObject, parameterName) {
  const payloads = [];
  for (let i = 0; i < _random(1, constants.DC_STUB_MAX_SUBSCRIPTION_VALUES); i += 1) {
    payloads.push(getPayload(Date.now(), comObject, parameterName));
  }

  return payloads;
}

module.exports = {
  subscription: (queryId, dataId, alarmType, zmq) => {
    const buffer = [
      null,
      header,
      stubData.getStringProtobuf(queryId),
      stubData.getDataIdProtobuf(dataId),
      encode('dc.dataControllerUtils.AlarmType', alarmType),
      encode('dc.dataControllerUtils.AlarmMode', constants.ALARM_MODE_ALL),
    ];

    _each(getPayloads(dataId.comObject, dataId.parameterName), (payload) => {
      buffer.push(payload.timestamp);
      buffer.push(payload.payload);
    });

    zmq.push('stubData', buffer);
  },

  query: (queryId, dataId, alarmType, alarmMode, interval, zmq) => {
    const buffer = [
      null,
      header,
      stubData.getStringProtobuf(queryId),
      stubData.getDataIdProtobuf(dataId),
      encode('dc.dataControllerUtils.AlarmType', alarmType),
      encode('dc.dataControllerUtils.AlarmMode', alarmMode),
    ];

    _each(getPayloads(dataId.comObject, dataId.parameterName), (payload) => {
      buffer.push(payload.timestamp);
      buffer.push(payload.payload);
    });

    zmq.push('stubData', buffer);
  },
};
