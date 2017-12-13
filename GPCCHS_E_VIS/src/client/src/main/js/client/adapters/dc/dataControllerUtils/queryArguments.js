// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const _map = require('lodash/map');

const timestamp = require('./timestamp');
const filter = require('./filter');
const alarmMode = require('./alarmMode');

module.exports = {
  encode: data => ({
    sortFieldName: data.sortFieldName,
    sortOrder: data.sortOrder,
    limitStart: data.limitStart,
    limitNumber: data.limitNumber,
    getLastType: data.getLastType,
    getLastFromTime: (typeof data.getLastFromTime !== 'undefined')
      ? timestamp.encode(data.getLastFromTime)
      : undefined,
    getLastNumber: data.getLastNumber,
    filters: _map(data.filters, f => filter.encode(f)),
    alarmMode: (typeof data.alarmMode !== 'undefined') ? alarmMode.encode(data.alarmMode) : undefined
  }),
  decode: data => ({
    sortFieldName: data.sortFieldName ? data.sortFieldName : null,
    sortOrder: data.hasOwnProperty('sortOrder') ? data.sortOrder : null,
    limitStart: data.limitStart ? data.limitStart : null,
    limitNumber: data.limitNumber ? data.limitNumber : null,
    getLastType: data.hasOwnProperty('getLastType') ? data.getLastType : null,
    getLastFromTime: (data.getLastFromTime !== null)
      ? timestamp.decode(data.getLastFromTime)
      : data.getLastFromTime,
    getLastNumber: data.getLastNumber ? data.getLastNumber : null,
    filters: _map(data.filters, f => filter.decode(f)),
    alarmMode: (data.alarmMode !== null) ? alarmMode.decode(data.alarmMode) : null
  }),
};
