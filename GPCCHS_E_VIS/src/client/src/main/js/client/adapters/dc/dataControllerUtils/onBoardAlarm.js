const _map = require('lodash/map');
const tIME = require('../ccsds_mal/tIME');
const namedValue = require('../../isis/ccsds_mal/namedValue');

module.exports = {
  encode: data => ({
    apid: data.apid,
    reportId: data.reportId,
    reportName: data.reportName,
    eventType: data.eventType,
    alarmLevel: data.alarmLevel,
    onBoardDate: (data.onBoardDate !== null && typeof data.onBoardDate !== 'undefined')
      ? tIME.encode(data.onBoardDate)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    parameter: _map(data.parameter, d => (namedValue.encode(d))),
  }),
  decode: data => ({
    apid: data.apid,
    reportId: data.reportId,
    reportName: data.reportName,
    eventType: data.eventType,
    alarmLevel: data.alarmLevel,
    onBoardDate: (data.onBoardDate !== null && typeof data.onBoardDate !== 'undefined')
      ? tIME.decode(data.onBoardDate)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : null,
    parameter: _map(data.parameter, d => (namedValue.decode(d))),
  }),
};
