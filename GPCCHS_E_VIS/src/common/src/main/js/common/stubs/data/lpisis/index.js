/* eslint-disable global-require */
const protobuf = require('../../../protobuf');

module.exports = {
  getDecommutedValue: require('./decommutedPacket/decommutedValue'),
  getDecommutedPacket: require('./decommutedPacket/decommutedPacket'),
  getDecommutedPacketProtobuf: override => protobuf.encode(
    'lpisis.decommutedPacket.DecommutedPacket',
    require('./decommutedPacket/decommutedPacket')(override)
  ),
  getDecommutedPacketDeProtobuf: proto => protobuf.decode(
    'lpisis.decommutedPacket.DecommutedPacket',
    proto
  ),
  getDocument: require('./file/document'),
  getDocumentProtobuf: override => protobuf.encode(
    'lpisis.file.Document',
    require('./file/document')(override)
  ),
  getDocumentDeProtobuf: proto => protobuf.decode(
    'lpisis.file.Document',
    proto
  ),
  getProfileRight: require('./file/profileRight'),
  getProfileRightProtobuf: override => protobuf.encode(
    'lpisis.file.ProfileRight',
    require('./file/profileRight')(override)
  ),
  getProfileRightDeProtobuf: proto => protobuf.decode(
    'lpisis.file.ProfileRight',
    proto
  ),
  getUser: require('./ccsds_cs/user'),
  getUserProtobuf: override => protobuf.encode(
    'lpisis.ccsds_cs.User',
    require('./ccsds_cs/user')(override)
  ),
  getUserDeProtobuf: proto => protobuf.decode(
    'lpisis.ccsds_cs.User',
    proto
  ),
  getUserRight: require('./file/userRight'),
  getUserRightProtobuf: override => protobuf.encode(
    'lpisis.file.UserRight',
    require('./file/userRight')(override)
  ),
  getUserRightDeProtobuf: proto => protobuf.decode(
    'lpisis.file.UserRight',
    proto
  ),
  getNamedValue: require('./ccsds_mal/namedValue'),
  getNamedValueProtobuf: override => protobuf.encode(
    'lpisis.ccsds_mal.NamedValue',
    require('./ccsds_mal/namedValue')(override)
  ),
  getNamedValueDeProtobuf: proto => protobuf.decode(
    'lpisis.ccsds_mal.NamedValue',
    proto
  ),
};
