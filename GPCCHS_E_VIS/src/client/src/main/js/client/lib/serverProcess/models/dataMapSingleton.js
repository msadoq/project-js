// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// END-HISTORY
// ====================================================================

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
