// Generated file


module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: data.name }
      : null,
    version: (data.version !== null && typeof data.version !== 'undefined')
      ? { value: data.version }
      : null,
    uri: (data.uri !== null && typeof data.uri !== 'undefined')
      ? { value: data.uri }
      : null,
    brokenLink: (data.brokenLink !== null && typeof data.brokenLink !== 'undefined')
      ? { value: data.brokenLink }
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'string', value: data.name.value }
      : undefined,
    version: (data.version !== null && typeof data.version !== 'undefined')
      ? { type: 'string', value: data.version.value }
      : undefined,
    uri: (data.uri !== null && typeof data.uri !== 'undefined')
      ? { type: 'uri', value: data.uri.value.toBuffer() }
      : undefined,
    brokenLink: (data.brokenLink !== null && typeof data.brokenLink !== 'undefined')
      ? { type: 'boolean', value: data.brokenLink.value }
      : undefined,
  }),
};

