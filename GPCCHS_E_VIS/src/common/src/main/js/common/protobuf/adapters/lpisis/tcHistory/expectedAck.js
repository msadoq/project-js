module.exports = {
  encode: data => ({
    acceptance: { value: data.acceptance },
    executionComplete: { value: data.executionComplete },
    executionStart: { value: data.executionStart },
  }),
  decode: data => ({
    acceptance: { type: 'boolean', value: data.acceptance.value },
    executionComplete: { type: 'boolean', value: data.executionComplete.value },
    executionStart: { type: 'boolean', value: data.executionStart.value },
  }),
};
