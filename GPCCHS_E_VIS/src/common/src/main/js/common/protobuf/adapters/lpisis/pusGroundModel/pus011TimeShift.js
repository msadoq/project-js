// Produced by Acceleo JavaScript Generator 1.1.0


module.exports = {
  encode: data => ({
    applicationTime: (data.applicationTime !== null && typeof data.applicationTime !== 'undefined')
      ? { value: data.applicationTime }
      : null,
    timeShiftOffset: (data.timeShiftOffset !== null && typeof data.timeShiftOffset !== 'undefined')
      ? { value: data.timeShiftOffset }
      : null,
  }),
  decode: data => ({
    applicationTime: (data.applicationTime !== null && typeof data.applicationTime !== 'undefined')
      ? { type: 'time', value: data.applicationTime.value.toNumber() }
      : undefined,
    timeShiftOffset: (data.timeShiftOffset !== null && typeof data.timeShiftOffset !== 'undefined')
      ? { type: 'integer', value: data.timeShiftOffset.value }
      : undefined,
  }),
};

