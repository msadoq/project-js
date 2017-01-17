// Generated file
const ack = require('./ack');

module.exports = {
  encode: data => ({
    ackRequestDate: (data.ackRequestDate !== null && typeof data.ackRequestDate !== 'undefined')
      ? { value: data.ackRequestDate }
      : null,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? { value: data.systemDate }
      : null,
    ack: (data.ack !== null && typeof data.ack !== 'undefined')
      ? ack.encode(data.ack)
      : null,
    comment: (data.comment !== null && typeof data.comment !== 'undefined')
      ? { value: data.comment }
      : null,
  }),
  decode: data => ({
    ackRequestDate: (data.ackRequestDate !== null && typeof data.ackRequestDate !== 'undefined')
      ? { type: 'time', value: data.ackRequestDate.value.toNumber() }
      : undefined,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? { type: 'time', value: data.systemDate.value.toNumber() }
      : undefined,
    ack: (data.ack !== null && typeof data.ack !== 'undefined')
      ? ack.decode(data.ack)
      : undefined,
    comment: (data.comment !== null && typeof data.comment !== 'undefined')
      ? { type: 'string', value: data.comment.value }
      : undefined,
    referenceTimestamp: (data.ackRequestDate !== null && typeof data.ackRequestDate !== 'undefined')
        ? { type: 'time', value: data.ackRequestDate.value.toNumber() }
        : undefined,
  }),
};

