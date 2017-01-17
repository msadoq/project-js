// Generated file


module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: data.name }
      : null,
    uid: (data.uid !== null && typeof data.uid !== 'undefined')
      ? { value: data.uid }
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'string', value: data.name.value }
      : undefined,
    uid: (data.uid !== null && typeof data.uid !== 'undefined')
      ? { type: 'long', value: data.uid.value.toNumber() }
      : undefined,
  }),
};

