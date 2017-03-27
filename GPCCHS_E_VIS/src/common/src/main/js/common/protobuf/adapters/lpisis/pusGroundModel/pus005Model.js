// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pus005OnBoardEvent = require('./pus005OnBoardEvent');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    pus005OnBoardEvent: _map(data.pus005OnBoardEvent, d => (pus005OnBoardEvent.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    noMonitoringEvents: (data.noMonitoringEvents !== null && typeof data.noMonitoringEvents !== 'undefined')
      ? { value: data.noMonitoringEvents }
      : null,
    noEventReports: (data.noEventReports !== null && typeof data.noEventReports !== 'undefined')
      ? { value: data.noEventReports }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    pus005OnBoardEvent: _map(data.pus005OnBoardEvent, d => (pus005OnBoardEvent.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    noMonitoringEvents: (data.noMonitoringEvents !== null && typeof data.noMonitoringEvents !== 'undefined')
      ? { type: 'uinteger', value: data.noMonitoringEvents.value }
      : undefined,
    noEventReports: (data.noEventReports !== null && typeof data.noEventReports !== 'undefined')
      ? { type: 'uinteger', value: data.noEventReports.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

