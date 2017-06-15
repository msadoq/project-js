// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _map = require('lodash/map');
const namedValue = require('../ccsds_mal/namedValue');
const profileRight = require('./profileRight');
const user = require('../ccsds_cs/user');
const userRight = require('./userRight');
const {
  uoctetToBytes,
  bytesToUoctet,
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? user.encode(data.lockedBy)
      : null,
    dirname: (data.dirname !== null && typeof data.dirname !== 'undefined')
      ? { value: stringToBytes(data.dirname) }
      : null,
    properties: _map(data.properties, d => (namedValue.encode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.encode(d))),
    profilesAccess: _map(data.profilesAccess, d => (profileRight.encode(d))),
    basename: (data.basename !== null && typeof data.basename !== 'undefined')
      ? { value: data.basename }
      : null,
    confidentiality: (data.confidentiality !== null && typeof data.confidentiality !== 'undefined')
      ? { value: uoctetToBytes(data.confidentiality) }
      : null,
  }),
  decode: data => ({
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? user.decode(data.lockedBy)
      : undefined,
    dirname: (data.dirname !== null && typeof data.dirname !== 'undefined')
      ? { type: 'uri', value: bytesToString(data.dirname.value) }
      : undefined,
    properties: _map(data.properties, d => (namedValue.decode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.decode(d))),
    profilesAccess: _map(data.profilesAccess, d => (profileRight.decode(d))),
    basename: (data.basename !== null && typeof data.basename !== 'undefined')
      ? { type: 'string', value: data.basename.value }
      : undefined,
    confidentiality: (data.confidentiality !== null && typeof data.confidentiality !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.confidentiality.value) }
      : undefined,
  }),
};
