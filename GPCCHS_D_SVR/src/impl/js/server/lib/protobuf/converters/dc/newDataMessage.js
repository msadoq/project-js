const dataId = require('./dataId');
const dataPayloads = require('./dataPayloads');

module.exports = {
  encode: data => ({
    dataId: dataId.encode(data.dataId),
    id: data.id,
    payloads: dataPayloads.encode(data.payloads),
  }),
  decode: data => ({
    dataId: dataId.decode(data.dataId),
    id: data.id,
    payloads: dataPayloads.decode(data.payloads),
  }),
};
