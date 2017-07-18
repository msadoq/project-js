const timestamp = require('./timestamp');

module.exports = {
  encode: data => ({
    startTime: timestamp.encode(data.startTime),
    endTime: timestamp.encode(data.endTime),
  }),
  decode: data => ({
    startTime: timestamp.decode(data.startTime),
    endTime: timestamp.decode(data.endTime),
  }),
};
