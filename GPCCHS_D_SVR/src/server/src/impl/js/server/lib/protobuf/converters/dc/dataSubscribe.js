const dataId = require('./dataId');

module.exports = {
  encode: data => ({
    action: data.action,
    id: data.id,
    dataId: dataId.encode(data.dataId),
  }),
  decode: data => ({
    action: data.action,
    id: data.id,
    dataId: dataId.decode(data.dataId),
  }),
};
