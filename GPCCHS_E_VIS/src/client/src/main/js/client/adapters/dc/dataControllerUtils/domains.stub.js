// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./domains');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/Domains.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Domains');

const { getDomain } = require('./domain.stub');

const getDomains = override => applyOverride({
  domains: [
    getDomain(),
    getDomain({ name: 'fr.cnes', domainId: 2, parentDomainId: 1 }),
    getDomain({ name: 'fr.cnes.isis', domainId: 3, parentDomainId: 2 }),
    getDomain({ name: 'fr.cnes.isis.simupus', domainId: 4, parentDomainId: 3 }),
    getDomain({ name: 'fr.cnes.isis.spot3', domainId: 5, parentDomainId: 3 }),
    getDomain({ name: 'fr.cnes.isis.msn2', domainId: 6, parentDomainId: 3 }),
    getDomain({ name: 'fr.cnes.isis.msn2.babs', domainId: 21, parentDomainId: 20 }),
    getDomain({ name: 'fr.cnes.isis.msn2.babs.babs1', domainId: 22, parentDomainId: 21 }),
    getDomain({ name: 'fr.cnes.isis.msn2.babt', domainId: 24, parentDomainId: 20 }),
    getDomain({ name: 'fr.cnes.isis.station', domainId: 25, parentDomainId: 3 }),
    getDomain({ name: 'fr.cnes.isis.station.hbk', domainId: 26, parentDomainId: 25 }),
    getDomain({ name: 'fr.cnes.isis.station.krn', domainId: 27, parentDomainId: 25 }),
    getDomain({ name: 'fr.cnes.isis.station.aus', domainId: 28, parentDomainId: 25 }),
    getDomain({ name: 'fr.cnes.isis.station.kru', domainId: 29, parentDomainId: 25 }),
    getDomain({ name: 'fr.cnes.isis.station.ker', domainId: 30, parentDomainId: 25 }),
    getDomain({ name: 'fr.cnes.isis.station.tls', domainId: 31, parentDomainId: 25 }),
  ],
}, override);

const getDomainsProtobuf = override => Builder.encode(Adapter.encode(getDomain(override))).finish();

module.exports = {
  getDomains,
  getDomainsProtobuf,
};
