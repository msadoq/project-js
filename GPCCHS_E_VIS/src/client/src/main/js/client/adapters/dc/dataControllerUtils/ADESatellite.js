module.exports = {
  encode: ({itemNamespace, name, uid, domainName}) => ({
    itemNamespace,
    name,
    uid,
    domainName,
  }),
  decode: ({itemNamespace, name, uid, domainName}) => ({
    itemNamespace,
    name,
    uid,
    domainName,
  }),
};