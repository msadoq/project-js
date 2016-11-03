const { map: _map } = require('lodash');
const domain = require('./domain');

module.exports = {
  encode: data => ({
    domains: _map(data.domains, d => domain.encode(d)),
  }),
  decode: data => ({
    domains: _map(data.domains, d => domain.decode(d)),
  }),
};
