const timestamp = require('./timestamp');

module.exports = {
  encode: data => ({
    lowerTs: timestamp.encode(data.lowerTs),
    upperTs: timestamp.encode(data.upperTs),
  }),
  decode: data => ({
    lowerTs: timestamp.decode(data.lowerTs),
    upperTs: timestamp.decode(data.upperTs),
  }),
};
