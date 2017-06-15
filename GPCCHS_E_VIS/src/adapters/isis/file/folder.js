// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _map = require('lodash/map');
const namedValue = require('../ccsds_mal/namedValue');
const profileRight = require('./profileRight');
const userRight = require('./userRight');
const {
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    profilesAccess: _map(data.profilesAccess, d => (profileRight.encode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.encode(d))),
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? { value: stringToBytes(data.path) }
      : null,
    properties: _map(data.properties, d => (namedValue.encode(d))),
  }),
  decode: data => ({
    profilesAccess: _map(data.profilesAccess, d => (profileRight.decode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.decode(d))),
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? { type: 'uri', value: bytesToString(data.path.value) }
      : undefined,
    properties: _map(data.properties, d => (namedValue.decode(d))),
  }),
};
