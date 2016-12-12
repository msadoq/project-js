const protobuf = require('../../../../protobuf');
const applyOverride = require('../../applyOverride');

const { getSession } = require('./session');

let successiveCalls = 0;

const getSessions = (override) => {
  // session time emulation on consecutive calls
  const compensation = successiveCalls * 1000 * 3600 * 24 * 365;
  const timestamp = { ms: Date.now() - compensation };
  successiveCalls += 1;

  return applyOverride({
    sessions: [
      getSession({ timestamp }),
      getSession({ name: 'Session#42', id: 42, delta: 42, timestamp }),
      getSession({ name: 'Session#181', id: 181, delta: 0, timestamp }),
    ],
  }, override);
};

const getSessionsProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Sessions',
  getSession(override)
);

module.exports = {
  getSessions,
  getSessionsProtobuf,
};
