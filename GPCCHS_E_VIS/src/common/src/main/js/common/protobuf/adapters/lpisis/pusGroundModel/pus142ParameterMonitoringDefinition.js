// Generated file


module.exports = {
  encode: data => ({
    paramMonId: (data.paramMonId !== null && typeof data.paramMonId !== 'undefined')
      ? { value: data.paramMonId }
      : null,
  }),
  decode: data => ({
    paramMonId: (data.paramMonId !== null && typeof data.paramMonId !== 'undefined')
      ? { type: 'uinteger', value: data.paramMonId.value }
      : undefined,
  }),
};

