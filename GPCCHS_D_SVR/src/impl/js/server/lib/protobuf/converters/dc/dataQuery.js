const dataId = require('./dataId');
const timeInterval = require('./timeInterval');

module.exports = {
  encode: data => ({
    id: data.id,
    dataId: dataId.encode(data.dataId),
    interval: timeInterval.encode(data.interval),
  }),
  decode: data => ({
    id: data.id,
    dataId: dataId.decode(data.dataId),
    interval: timeInterval.decode(data.interval),
  }),
};
