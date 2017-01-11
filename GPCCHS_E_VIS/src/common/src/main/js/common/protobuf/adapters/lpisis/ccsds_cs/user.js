module.exports = {
  encode: data => ({
    login: { value: data.login },
    password: { value: data.password },
    profile: { value: data.profile },
    userTime: { value: data.userTime },
  }),
  decode: data => ({
    login: { type: 'string', value: data.login.value },
    password: { type: 'string', value: data.password.value },
    profile: { type: 'string', value: data.profile.value },
    userTime: { type: 'time', value: data.userTime.value.toNumber() },
  }),
};
