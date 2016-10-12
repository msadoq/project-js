const _ = require('lodash');
const domain = require('./domain');

module.exports = {
  encode: data => ({
    domains: _.map(data.domains, d => domain.encode(d)),
  }),
  decode: data => ({
    domains: _.map(data.domains, d => domain.decode(d)),
  }),
};
