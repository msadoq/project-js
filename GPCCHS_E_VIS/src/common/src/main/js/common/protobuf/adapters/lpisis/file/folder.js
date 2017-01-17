// Generated file
const _map = require('lodash/map');
const profileRight = require('./profileRight');
const userRight = require('./userRight');

module.exports = {
  encode: data => ({
    profilesAccess: _map(data.profilesAccess, d => (profileRight.encode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.encode(d))),
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? { value: data.path }
      : null,
  }),
  decode: data => ({
    profilesAccess: _map(data.profilesAccess, d => (profileRight.decode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.decode(d))),
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? { type: 'uri', value: data.path.value.toBuffer() }
      : undefined,
  }),
};

