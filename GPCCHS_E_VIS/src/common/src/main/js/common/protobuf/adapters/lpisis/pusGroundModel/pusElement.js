// Produced by Acceleo JavaScript Generator 1.1.0


module.exports = {
  encode: data => ({
    lastUpdateMode: (data.lastUpdateMode !== null && typeof data.lastUpdateMode !== 'undefined')
      ? { value: data.lastUpdateMode }
      : null,
    lastUpdateTime: (data.lastUpdateTime !== null && typeof data.lastUpdateTime !== 'undefined')
      ? { value: data.lastUpdateTime }
      : null,
  }),
  decode: data => ({
    lastUpdateMode: (data.lastUpdateMode !== null && typeof data.lastUpdateMode !== 'undefined')
      ? { type: 'uinteger', value: data.lastUpdateMode.value }
      : undefined,
    lastUpdateTime: (data.lastUpdateTime !== null && typeof data.lastUpdateTime !== 'undefined')
      ? { type: 'time', value: data.lastUpdateTime.value.toNumber() }
      : undefined,
  }),
};

