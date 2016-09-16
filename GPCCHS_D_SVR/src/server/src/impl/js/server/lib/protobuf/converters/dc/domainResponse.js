const _ = require('lodash');
const domain = require('./domain');

module.exports = {
  encode: data => ({
    id: data.id,
    domains: _.map(data.domains, item => domain.encode(item)),
  }),
  decode: data => ({
    id: data.id,
    domains: _.map(data.domains, item => domain.decode(item)),
  }),
};
