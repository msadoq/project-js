// Produced by Acceleo JavaScript Generator 1.1.0


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

