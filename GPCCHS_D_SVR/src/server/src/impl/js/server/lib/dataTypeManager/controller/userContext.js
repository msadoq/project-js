const JS = require('../protoFile/userContext.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const UserContext = JS.UserContext;

exports.binToJson = (payload) => {
  const decoded = UserContext.decode(payload);
  const userContext = {
    userId: decoded.userId.value,    currentProfileId: decoded.currentProfileId.value,    userContextTime: decoded.userContextTime.value
  };
  return userContext;
};
