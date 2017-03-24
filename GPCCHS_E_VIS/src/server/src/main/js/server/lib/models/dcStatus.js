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
