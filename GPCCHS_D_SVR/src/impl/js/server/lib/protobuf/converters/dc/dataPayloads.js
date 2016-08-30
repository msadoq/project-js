const _ = require('lodash');
const timestamp = require('./timestamp');

module.exports = {
  // TODO data is an array
  encode: data => _.map(data, item => ({
    timestamp: timestamp.encode(item.timestamp),
    payload: item.payload,
  })),
  decode: data => _.map(data, item => ({
    timestamp: timestamp.decode(item.timestamp),
    payload: item.payload,
  })),
};
