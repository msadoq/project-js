// eslint-disable-next-line no-underscore-dangle
const _map = require('lodash/map');

const domain = require('./domain');

module.exports = {
  encode: data => ({
    domains: _map(data.domains, d => domain.encode(d)),
  }),
  decode: data => ({
    domains: _map(data.domains, d => domain.decode(d)),
  }),
};
