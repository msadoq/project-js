let queue = {};

module.exports = {
  add: (remoteId, payloads) => {
    if (!Object.keys(payloads).length) {
      return;
    }
    if (typeof queue[remoteId] === 'undefined') {
      queue[remoteId] = {};
    }

    queue[remoteId] = Object.assign(queue[remoteId], payloads);
  },
  get: () => queue,
  reset: () => {
    const data = queue;
    queue = {};
    return data;
  },
};
