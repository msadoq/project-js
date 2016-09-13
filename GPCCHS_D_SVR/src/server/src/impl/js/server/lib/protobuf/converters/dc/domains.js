const _ = require('lodash');

module.exports = {
  encode: data => _.map(data, item => ({
    itemNamespace: item.itemNamespace,
    name: item.name,
    oid: item.oid,
    domainId: item.domainId,
    parentDomainId: item.parentDomainId
  })),
  decode: data => _.map(data, item => ({
    itemNamespace: item.itemNamespace,
    name: item.name,
    oid: item.oid,
    domainId: item.domainId,
    parentDomainId: item.parentDomainId
  })),
};
