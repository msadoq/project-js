// Produced by Acceleo JavaScript Generator 1.1.0


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
      ? { type: 'long', symbol: data.userId.value.toString() }
      : undefined,
    currentProfileId: (data.currentProfileId !== null && typeof data.currentProfileId !== 'undefined')
      ? { type: 'long', symbol: data.currentProfileId.value.toString() }
      : undefined,
    userContextTime: (data.userContextTime !== null && typeof data.userContextTime !== 'undefined')
      ? { type: 'time', value: data.userContextTime.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.userContextTime !== null && typeof data.userContextTime !== 'undefined')
        ? { type: 'time', value: data.userContextTime.value.toNumber() }
        : undefined,
  }),
};
