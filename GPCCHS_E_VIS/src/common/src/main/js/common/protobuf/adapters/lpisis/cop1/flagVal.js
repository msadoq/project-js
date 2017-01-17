// Generated file


module.exports = {
  encode: data => ({
    val: (data.val !== null && typeof data.val !== 'undefined')
      ? { value: data.val }
      : null,
    flag: (data.flag !== null && typeof data.flag !== 'undefined')
      ? { value: data.flag }
      : null,
  }),
  decode: data => ({
    val: (data.val !== null && typeof data.val !== 'undefined')
      ? { type: 'integer', value: data.val.value }
      : undefined,
    flag: (data.flag !== null && typeof data.flag !== 'undefined')
      ? { type: 'boolean', value: data.flag.value }
      : undefined,
  }),
};

