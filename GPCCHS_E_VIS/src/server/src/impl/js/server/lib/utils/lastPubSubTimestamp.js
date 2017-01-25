let lastPubSubTimestamp;

module.exports = {
  set: (timestamp) => {
    lastPubSubTimestamp = timestamp;
  },
  get: () => lastPubSubTimestamp,
  reset: () => {
    const timestamp = lastPubSubTimestamp;
    lastPubSubTimestamp = undefined;
    return timestamp;
  },
};
