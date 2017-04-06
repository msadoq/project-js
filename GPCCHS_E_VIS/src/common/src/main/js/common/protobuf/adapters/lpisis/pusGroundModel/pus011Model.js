// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    maxNoTc: (data.maxNoTc !== null && typeof data.maxNoTc !== 'undefined')
      ? { value: data.maxNoTc }
      : null,
    scheduleStatus: (data.scheduleStatus !== null && typeof data.scheduleStatus !== 'undefined')
      ? { value: data.scheduleStatus }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    noCommands: (data.noCommands !== null && typeof data.noCommands !== 'undefined')
      ? { value: data.noCommands }
      : null,
    noSubSchedule: (data.noSubSchedule !== null && typeof data.noSubSchedule !== 'undefined')
      ? { value: data.noSubSchedule }
      : null,
    enabledApids: _map(data.enabledApids, d => ({ value: d })),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    disabledApids: _map(data.disabledApids, d => ({ value: d })),
  }),
  decode: data => ({
    maxNoTc: (data.maxNoTc !== null && typeof data.maxNoTc !== 'undefined')
      ? { type: 'uinteger', value: data.maxNoTc.value }
      : undefined,
    scheduleStatus: (data.scheduleStatus !== null && typeof data.scheduleStatus !== 'undefined')
      ? { type: 'uinteger', value: data.scheduleStatus.value }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    noCommands: (data.noCommands !== null && typeof data.noCommands !== 'undefined')
      ? { type: 'uinteger', value: data.noCommands.value }
      : undefined,
    noSubSchedule: (data.noSubSchedule !== null && typeof data.noSubSchedule !== 'undefined')
      ? { type: 'uinteger', value: data.noSubSchedule.value }
      : undefined,
    enabledApids: _map(data.enabledApids, d => ({ type: 'uinteger', value: d.value })),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    disabledApids: _map(data.disabledApids, d => ({ type: 'uinteger', value: d.value })),
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

