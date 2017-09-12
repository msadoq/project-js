let dataMap;

module.exports = {
  set: (status) => {
    dataMap = status;
  },
  get: () => dataMap,
  reset: () => {
    dataMap = { perRemoteId: {}, perView: {}, expectedIntervals: {} };
  },
};
