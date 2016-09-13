const dataId = require('./dataId');
const dataPayloads = require('./dataPayloads');

module.exports = {
  encode: data => ({
    id : data.id,
    dataSource : data.dataSource,
    dataId: dataId.encode(data.dataId),
    payloads: dataPayloads.encode(data.payloads),
    isEndOfQuery : data.isEndOfQuery
  }),
  decode: data => ({
    id : data.id,
    dataSource : data.dataSource,
    dataId: dataId.decode(data.dataId),
    payloads: dataPayloads.decode(data.payloads),
    isEndOfQuery : data.isEndOfQuery
  }),
};
