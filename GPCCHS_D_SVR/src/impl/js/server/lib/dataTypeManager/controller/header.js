const Header = require('../protoFile/header.proto.js');

exports.binToJson = (payload) => {
  const decoded = Header.decode(payload);
  return decoded;
};
