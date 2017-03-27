// Produced by Acceleo JavaScript Generator 1.1.0


module.exports = {
  encode: data => ({
    login: (data.login !== null && typeof data.login !== 'undefined')
      ? { value: data.login }
      : null,
    password: (data.password !== null && typeof data.password !== 'undefined')
      ? { value: data.password }
      : null,
    profile: (data.profile !== null && typeof data.profile !== 'undefined')
      ? { value: data.profile }
      : null,
    userTime: (data.userTime !== null && typeof data.userTime !== 'undefined')
      ? { value: data.userTime }
      : null,
  }),
  decode: data => ({
    login: (data.login !== null && typeof data.login !== 'undefined')
      ? { type: 'string', value: data.login.value }
      : undefined,
    password: (data.password !== null && typeof data.password !== 'undefined')
      ? { type: 'string', value: data.password.value }
      : undefined,
    profile: (data.profile !== null && typeof data.profile !== 'undefined')
      ? { type: 'string', value: data.profile.value }
      : undefined,
    userTime: (data.userTime !== null && typeof data.userTime !== 'undefined')
      ? { type: 'time', value: data.userTime.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.userTime !== null && typeof data.userTime !== 'undefined')
        ? { type: 'time', value: data.userTime.value.toNumber() }
        : undefined,
  }),
};

