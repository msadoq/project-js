module.exports = {
  encode: data => ({
    id: data.id,
    status: data.status,
    reason: data.reason,
  }),
  decode: data => ({
    id: data.id,
    status: data.status,
    reason: data.reason,
  }),
};
