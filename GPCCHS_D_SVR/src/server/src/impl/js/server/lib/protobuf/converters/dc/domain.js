module.exports = {
  encode: data => ({
    itemNamespace: data.itemNamespace,
    name: data.name,
    oid: data.oid,
    domainId: data.domainId,
    parentDomainId: data.parentDomainId
  }),
  decode: data => ({
    itemNamespace: data.itemNamespace,
    name: data.name,
    oid: data.oid,
    domainId: data.domainId,
    parentDomainId: data.parentDomainId
  }),
};
