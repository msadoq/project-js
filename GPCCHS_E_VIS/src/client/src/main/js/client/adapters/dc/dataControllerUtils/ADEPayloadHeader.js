module.exports = {
  encode: (data) => ({
    providerId: data.providerId,
    comObjectType: data.comObjectType,
    instanceOid: data.instanceOid,
  }),
  decode: (data) => ({
    providerId: data.providerId,
    comObjectType: data.comObjectType,
    instanceOid: data.instanceOid,
  }),
};