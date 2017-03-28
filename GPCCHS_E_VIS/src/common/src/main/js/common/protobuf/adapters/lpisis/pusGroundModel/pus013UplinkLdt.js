// Produced by Acceleo JavaScript Generator 1.1.0
const pus013Ldt = require('./pus013Ldt');

module.exports = {
  encode: data => ({
    ackTimerArmed: (data.ackTimerArmed !== null && typeof data.ackTimerArmed !== 'undefined')
      ? { value: data.ackTimerArmed }
      : null,
    ackTimerDeadline: (data.ackTimerDeadline !== null && typeof data.ackTimerDeadline !== 'undefined')
      ? { value: data.ackTimerDeadline }
      : null,
    pus013Ldt: (data.pus013Ldt !== null && typeof data.pus013Ldt !== 'undefined')
      ? pus013Ldt.encode(data.pus013Ldt)
      : null,
  }),
  decode: data => ({
    ackTimerArmed: (data.ackTimerArmed !== null && typeof data.ackTimerArmed !== 'undefined')
      ? { type: 'boolean', value: data.ackTimerArmed.value }
      : undefined,
    ackTimerDeadline: (data.ackTimerDeadline !== null && typeof data.ackTimerDeadline !== 'undefined')
      ? { type: 'long', symbol: data.ackTimerDeadline.value.toString() }
      : undefined,
    pus013Ldt: (data.pus013Ldt !== null && typeof data.pus013Ldt !== 'undefined')
      ? pus013Ldt.decode(data.pus013Ldt)
      : undefined,
  }),
};
