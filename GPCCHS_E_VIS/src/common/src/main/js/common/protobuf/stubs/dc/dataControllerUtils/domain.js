const applyOverride = require('../../applyOverride');

const getDomain = override => applyOverride({
  itemNamespace: 'Domains',
  name: 'fr.cnes.isis',
  oid: '0051525005151000565215465660515',
  domainId: 1,
  parentDomainId: 0,
}, override);

module.exports = {
  getDomain,
};
