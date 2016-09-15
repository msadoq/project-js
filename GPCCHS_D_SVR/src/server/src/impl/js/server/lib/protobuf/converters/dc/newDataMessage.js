const _ = require('lodash');
const dataId = require('./dataId');
const dataPayload = require('./dataPayload');

module.exports = {
  encode: data => ({
    id: data.id,
    dataSource: data.dataSource,
    dataId: dataId.encode(data.dataId),
    payloads: _.map(data.payloads, item => dataPayload.encode(item)),
    isEndOfQuery: data.isEndOfQuery,
  }),
  decode: data => ({
    id: data.id,
    dataSource: data.dataSource,
    dataId: dataId.decode(data.dataId),
    payloads: _.map(data.payloads, item => dataPayload.decode(item)),
    isEndOfQuery: data.isEndOfQuery,
  }),
};
