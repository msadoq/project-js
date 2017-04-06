// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
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
  }),
  decode: data => ({
    profilesAccess: _map(data.profilesAccess, d => (profileRight.decode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.decode(d))),
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? { type: 'uri', value: bytesToString(data.path.value) }
      : undefined,
  }),
};

