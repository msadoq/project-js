const _ = require('lodash');
const timestamp = require('./timestamp');
const filter = require('./filter');

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
    filters: _.map(data.filters, f => filter.encode(f)),
  }),
  decode: data => ({
    sortFieldName: data.sortFieldName,
    sortOrder: data.sortOrder,
    limitStart: data.limitStart,
    limitNumber: data.limitNumber,
    getLastType: data.getLastType,
    getLastFromTime: (data.getLastFromTime !== null)
      ? timestamp.decode(data.getLastFromTime)
      : undefined,
    getLastNumber: data.getLastNumber,
    filters: _.map(data.filters, f => filter.decode(f)),
  }),
};
