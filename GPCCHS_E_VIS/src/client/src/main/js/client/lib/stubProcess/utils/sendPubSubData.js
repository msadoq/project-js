// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// END-HISTORY
// ====================================================================

const _each = require('lodash/each');
const _random = require('lodash/random');
const constants = require('../../constants');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();
const getPayload = require('./getPayload');

const V1 = (queryId, dataId) => [
  null,
  stubData.getTimebasedPubSubDataHeaderProtobuf(),
  stubData.getStringProtobuf(queryId),
  stubData.getDataIdProtobuf(dataId),
];

const V2 = (queryId, dataId, rawBuffer) => [
  null,
  stubData.getTimebasedPubSubDataHeaderProtobufADE(queryId),
  rawBuffer,
];

const versionDCMap = {
  [constants.DC_COM_V1]: V1,
  [constants.DC_COM_V2]: V2,
}

function getPayloads(comObject, parameterName, versionDCCom) {
  const payloads = [];
  for (let i = 0; i < _random(1, constants.DC_STUB_MAX_SUBSCRIPTION_VALUES); i += 1) {
    const payload = getPayload(Date.now(), comObject, versionDCCom, {
      epName: parameterName,
      alarmFrequency: (1 / constants.DC_STUB_VALUE_ALARMTIMESTEP),
    });
    if (payload !== null) {
      payloads.push(payload);
    }
  }

  return payloads;
}

module.exports = (queryId, dataId, zmq, versionDCCom, rawBuffer) => {
  const buffer = versionDCMap[versionDCCom](queryId, dataId, rawBuffer);
  const payloads = getPayloads(dataId.comObject, dataId.parameterName, versionDCCom);
  _each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });

  if (payloads.length !== 0) {
    zmq.push('stubData', buffer);
  }
};
