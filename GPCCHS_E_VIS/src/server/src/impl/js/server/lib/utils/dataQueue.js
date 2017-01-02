let queue = {};

module.exports = {
  add: (remoteId, key, value) => {
    if (typeof key === 'undefined' || typeof value === 'undefined') {
      return;
    }
    if (typeof queue[remoteId] === 'undefined') {
      queue[remoteId] = {};
    }

    queue[remoteId][key] = value;
  },
  get: () => queue,
  reset: () => {
    const data = queue;
    queue = {};
    return data;
  },
};
