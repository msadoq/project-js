// Generated file


module.exports = {
  encode: data => ({
    SystemCreationDate: (data.SystemCreationDate !== null && typeof data.SystemCreationDate !== 'undefined')
      ? { value: data.SystemCreationDate }
      : null,
    ApplicationCreationDate: (data.ApplicationCreationDate !== null && typeof data.ApplicationCreationDate !== 'undefined')
      ? { value: data.ApplicationCreationDate }
      : null,
  }),
  decode: data => ({
    SystemCreationDate: (data.SystemCreationDate !== null && typeof data.SystemCreationDate !== 'undefined')
      ? { type: 'time', value: data.SystemCreationDate.value.toNumber() }
      : undefined,
    ApplicationCreationDate: (data.ApplicationCreationDate !== null && typeof data.ApplicationCreationDate !== 'undefined')
      ? { type: 'time', value: data.ApplicationCreationDate.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.ApplicationCreationDate !== null && typeof data.ApplicationCreationDate !== 'undefined')
        ? { type: 'time', value: data.ApplicationCreationDate.value.toNumber() }
        : undefined,
  }),
};

