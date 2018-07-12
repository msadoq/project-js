const pusValue = require('./pusValue');
const _map = require('lodash/map');


module.exports = {
  encode: data => ({
    pusValue: _map(data.pusValue, value => pusValue.encode(value)),
  }),
  decode: data => ({
    pusValue: _map(data.pusValue, value => pusValue.decode(value)),
  }),
};
