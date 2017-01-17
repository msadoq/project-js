// Generated file


module.exports = {
  encode: data => ({
    userId: (data.userId !== null && typeof data.userId !== 'undefined')
      ? { value: data.userId }
      : null,
    currentProfileId: (data.currentProfileId !== null && typeof data.currentProfileId !== 'undefined')
      ? { value: data.currentProfileId }
      : null,
    userContextTime: (data.userContextTime !== null && typeof data.userContextTime !== 'undefined')
      ? { value: data.userContextTime }
      : null,
  }),
  decode: data => ({
    userId: (data.userId !== null && typeof data.userId !== 'undefined')
      ? { type: 'long', value: data.userId.value.toNumber() }
      : undefined,
    currentProfileId: (data.currentProfileId !== null && typeof data.currentProfileId !== 'undefined')
      ? { type: 'long', value: data.currentProfileId.value.toNumber() }
      : undefined,
    userContextTime: (data.userContextTime !== null && typeof data.userContextTime !== 'undefined')
      ? { type: 'time', value: data.userContextTime.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.userContextTime !== null && typeof data.userContextTime !== 'undefined')
        ? { type: 'time', value: data.userContextTime.value.toNumber() }
        : undefined,
  }),
};

