// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some
//  stubProcesses and some controllers
// VERSION : 2.0.0 : DM : #5806 : 20/10/2017 : Change alarm frequency and random generation
// VERSION : 2.0.0 : DM : #5806 : 23/10/2017 : Generate and include out of time range alarms
//  requiring an Ack
// VERSION : 2.0.0 : DM : #5806 : 07/11/2017 : refacto for getpaiload for alarms
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix parseEntryPoint to take into account
//  provider field and update dc stubs
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
};

function getPayloads(dataId, versionDCCom) {
  const payloads = [];
  for (let i = 0; i < _random(1, constants.DC_STUB_MAX_SUBSCRIPTION_VALUES); i += 1) {
    const payload = getPayload(Date.now(), dataId, versionDCCom, {
      epName: dataId.parameterName,
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
  const payloads = getPayloads(dataId, versionDCCom);
  _each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });

  if (payloads.length !== 0) {
    zmq.push('stubData', buffer);
  }
};
