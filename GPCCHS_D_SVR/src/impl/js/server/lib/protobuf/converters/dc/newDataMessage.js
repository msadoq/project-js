const dataId = require('./dataId');
const dataPayloads = require('./dataPayloads');

module.exports = {
  encode: data => ({
    dataId: dataId.encode(data.dataId),
    payloads: dataPayloads.encode(data.payloads),
  }),
  decode: data => ({
    dataId: dataId.decode(data.dataId),
    payloads: dataPayloads.decode(data.payloads),
  }),
};
