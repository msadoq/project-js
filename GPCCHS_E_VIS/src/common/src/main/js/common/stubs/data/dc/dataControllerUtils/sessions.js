const protobuf = require('../../../../protobuf');
const applyOverride = require('../../applyOverride');

const { getSession } = require('./session');

const getSessions = override => applyOverride({
  sessions: [
    getSession(),
    getSession({ name: 'Session#42', id: 42, delta: 42 }),
  ],
}, override);

const getSessionsProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Sessions',
  getSession(override)
);

module.exports = {
  getSessions,
  getSessionsProtobuf,
};
