module.exports = {
  encode: data => ({
    acceptance: { value: data.acceptance },
    executionComplete: { value: data.executionComplete },
    executionStart: { value: data.executionStart },
  }),
  decode: data => ({
    acceptance: data.acceptance.value,
    executionComplete: data.executionComplete.value,
    executionStart: data.executionStart.value,
  }),
};
