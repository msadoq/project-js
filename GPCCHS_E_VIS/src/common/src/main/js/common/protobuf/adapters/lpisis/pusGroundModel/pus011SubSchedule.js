// Generated file
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? { value: data.ssId }
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { value: data.status }
      : null,
    executionTimeFirstTc: (data.executionTimeFirstTc !== null && typeof data.executionTimeFirstTc !== 'undefined')
      ? { value: data.executionTimeFirstTc }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
  }),
  decode: data => ({
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? { type: 'uinteger', value: data.ssId.value }
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'uinteger', value: data.status.value }
      : undefined,
    executionTimeFirstTc: (data.executionTimeFirstTc !== null && typeof data.executionTimeFirstTc !== 'undefined')
      ? { type: 'ulong', value: data.executionTimeFirstTc.value.toNumber() }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

