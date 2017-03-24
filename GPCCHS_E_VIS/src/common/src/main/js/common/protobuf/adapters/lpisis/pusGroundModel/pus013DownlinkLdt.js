// Generated file
const pus013Ldt = require('./pus013Ldt');

module.exports = {
  encode: data => ({
    receptionTimerArmed: (data.receptionTimerArmed !== null && typeof data.receptionTimerArmed !== 'undefined')
      ? { value: data.receptionTimerArmed }
      : null,
    receptionTimerDeadline: (data.receptionTimerDeadline !== null && typeof data.receptionTimerDeadline !== 'undefined')
      ? { value: data.receptionTimerDeadline }
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    pus013Ldt: (data.pus013Ldt !== null && typeof data.pus013Ldt !== 'undefined')
      ? pus013Ldt.encode(data.pus013Ldt)
      : null,
  }),
  decode: data => ({
    receptionTimerArmed: (data.receptionTimerArmed !== null && typeof data.receptionTimerArmed !== 'undefined')
      ? { type: 'boolean', value: data.receptionTimerArmed.value }
      : undefined,
    receptionTimerDeadline: (data.receptionTimerDeadline !== null && typeof data.receptionTimerDeadline !== 'undefined')
      ? { type: 'time', value: data.receptionTimerDeadline.value.toNumber() }
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'long', symbol: data.groundDate.value.toString() }
      : undefined,
    pus013Ldt: (data.pus013Ldt !== null && typeof data.pus013Ldt !== 'undefined')
      ? pus013Ldt.decode(data.pus013Ldt)
      : undefined,
  }),
};
