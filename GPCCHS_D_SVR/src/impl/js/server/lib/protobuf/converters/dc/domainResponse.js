const domains = require('./domains');

module.exports = {
  encode: data => ({
    id: data.id,
    domains: domains.encode(data.domains),
  }),
  decode: data => ({
    id: data.id,
    domains: domains.decode(data.domains)
  }),
};
