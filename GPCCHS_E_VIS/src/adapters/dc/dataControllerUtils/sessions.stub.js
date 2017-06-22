const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./sessions');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/Sessions.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Sessions');

const { getSession } = require('./session.stub');

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

const getSessionsProtobuf = override => Builder.encode(Adapter.encode(getSession(override))).finish();

module.exports = {
  getSessions,
  getSessionsProtobuf,
};
