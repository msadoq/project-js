// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// END-HISTORY
// ====================================================================

let dcStatus;

module.exports = {
  set: (status) => {
    dcStatus = status;
  },
  get: () => dcStatus,
  reset: () => {
    dcStatus = undefined;
  },
};
