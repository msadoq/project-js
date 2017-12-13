// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// END-HISTORY
// ====================================================================

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
