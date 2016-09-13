const JS = require('../protoFile/user.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const User = JS.User;

exports.binToJson = (payload) => {
  const decoded = User.decode(payload);
  const user = {
    login: decoded.login.value,    password: decoded.password.value,    profile: decoded.profile.value,    userTime: decoded.userTime.value
  };
  return user;
};
