const _map = require('lodash/map');

const protobuf = require('../../../');

const {
  uoctetToBytes,
  bytesToUoctet,
} = require('../../lpisis/types');

const userRight = require('./userRight');
const profileRight = require('./profileRight');
const namedValue = require('../ccsds_mal/namedValue');

module.exports = {
  encode: data => ({
    lockedBy: { value: protobuf.encode('lpisis.ccsds_cs.User', data.lockedBy) },
    dirname: { value: data.dirname },
    properties: _map(data.properties, p => namedValue.encode(p)),
    usersAccess: _map(data.usersAccess, a => userRight.encode(a)),
    profilesAccess: _map(data.profilesAccess, a => profileRight.encode(a)),
    basename: { value: data.basename },
    confidentiality: { value: uoctetToBytes(data.confidentiality) },
  }),
  decode: data => ({
    lockedBy: protobuf.decode('lpisis.ccsds_cs.User', data.lockedBy.value),
    dirname: { type: 'uri', value: data.dirname.value.toBuffer() },
    properties: _map(data.properties, p => namedValue.decode(p)),
    usersAccess: _map(data.usersAccess, a => userRight.decode(a)),
    profilesAccess: _map(data.profilesAccess, a => profileRight.decode(a)),
    basename: { type: 'string', value: data.basename.value },
    confidentiality: { type: 'uoctet', value: bytesToUoctet(data.confidentiality.value) },
  }),
};
