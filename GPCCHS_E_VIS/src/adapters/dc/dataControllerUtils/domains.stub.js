const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./domains');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/Domains.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Domains');

const { getDomain } = require('./domain.stub');

const getDomains = override => applyOverride({
  domains: [
    getDomain(),
    getDomain({ name: 'fr.cnes.isis.simupus', domainId: 4, parentDomainId: 1 }),
  ],
}, override);

const getDomainsProtobuf = override => Builder.encode(Adapter.encode(getDomain(override))).finish();

module.exports = {
  getDomains,
  getDomainsProtobuf,
};
