// Produced by Acceleo JavaScript Generator 1.1.0


module.exports = {
  encode: data => ({
    acceptance: (data.acceptance !== null && typeof data.acceptance !== 'undefined')
      ? { value: data.acceptance }
      : null,
    executionComplete: (data.executionComplete !== null && typeof data.executionComplete !== 'undefined')
      ? { value: data.executionComplete }
      : null,
    executionStart: (data.executionStart !== null && typeof data.executionStart !== 'undefined')
      ? { value: data.executionStart }
      : null,
  }),
  decode: data => ({
    acceptance: (data.acceptance !== null && typeof data.acceptance !== 'undefined')
      ? { type: 'boolean', value: data.acceptance.value }
      : undefined,
    executionComplete: (data.executionComplete !== null && typeof data.executionComplete !== 'undefined')
      ? { type: 'boolean', value: data.executionComplete.value }
      : undefined,
    executionStart: (data.executionStart !== null && typeof data.executionStart !== 'undefined')
      ? { type: 'boolean', value: data.executionStart.value }
      : undefined,
  }),
};

