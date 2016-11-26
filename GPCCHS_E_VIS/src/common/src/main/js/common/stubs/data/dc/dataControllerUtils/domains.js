const protobuf = require('../../../../protobuf');
const applyOverride = require('../../applyOverride');

const { getDomain } = require('./domain');

const getDomains = override => applyOverride({
  domains: [
    getDomain(),
    getDomain({ name: 'fr.cnes.isis.simupus', domainId: 4, parentDomainId: 1 }),
  ],
}, override);

const getDomainsProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Domains',
  getDomain(override)
);

module.exports = {
  getDomains,
  getDomainsProtobuf,
};
