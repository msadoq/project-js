const stubs = require('../../utils/stubs');
const getPayload = require('./getPayload');
const logger = require('../../common/logManager')('stubs:alarmAck');

const stubData = stubs.getStubData();
const header = stubData.getTimebasedPubSubDataHeaderProtobuf();

module.exports = function sendAlarmAckData(alarmAck, zmq) {
  const buffer = [
    null,
    header,
    stubData.getStringProtobuf(alarmAck.queryId),
    stubData.getDataIdProtobuf(alarmAck.dataId),
  ];

  alarmAck.alarms.forEach((alarm) => {
    const payload = getPayload(Date.now(), alarmAck.dataId.comObject, {
      setOid: alarm.oid,
      setComment: alarm.ackRequest.comment.value,
      withAckRequest: true,
      withAck: true,
    });

    logger.info(`Push acked alarm ${alarm.oid} with comment '${alarm.ackRequest.comment.value}'`);

    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });

  if (alarmAck.alarms.length !== 0) {
    zmq.push('stubData', buffer);
  }
};
