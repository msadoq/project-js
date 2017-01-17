// Generated file


module.exports = {
  encode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { value: data.status }
      : null,
    statusTime: (data.statusTime !== null && typeof data.statusTime !== 'undefined')
      ? { value: data.statusTime }
      : null,
  }),
  decode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'integer', value: data.status.value }
      : undefined,
    statusTime: (data.statusTime !== null && typeof data.statusTime !== 'undefined')
      ? { type: 'time', value: data.statusTime.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.statusTime !== null && typeof data.statusTime !== 'undefined')
        ? { type: 'time', value: data.statusTime.value.toNumber() }
        : undefined,
  }),
};

