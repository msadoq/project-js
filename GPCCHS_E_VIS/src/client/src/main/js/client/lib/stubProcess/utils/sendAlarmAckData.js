const stubs = require('../../utils/stubs');
const getPayload = require('./getPayload');
const logger = require('../../common/logManager')('stubs:alarmAck');
const constants = require('../../constants');

const stubData = stubs.getStubData();

module.exports = function sendAlarmAckData(queryId, alarms, zmq, rawBuffer, dataId) {
  const buffer = [
    null,
    stubData.getTimebasedPubSubDataHeaderProtobufADE(queryId),
    stubData.getADETimebasedSubscriptionProtobuf({
      action: 0,
      sessionId: dataId.sessionId,
      domainId: dataId.domainId,
      objectName: 'OnBoardAlarmAckRequest',
      catalogName: '',
      itemName: '',
      providerFlow: '',
    }),
  ];
  // TODO pgaucher set the version in getPayload
  alarms.forEach((alarm) => {
    const payload = getPayload(Date.now(), dataId, constants.DC_COM_V2, {
      setOid: alarm.oid,
      setComment: alarm.ackRequest.comment.value,
      withAckRequest: true,
      withAck: true,
    });

    logger.info(`Push acked alarm ${alarm.oid} with comment '${alarm.ackRequest.comment.value}'`);

    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });
  if (alarms.length !== 0) {
    zmq.push('stubData', buffer);
  }
};
