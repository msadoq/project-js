let timebar = {};

module.exports = {
  get: () => timebar,
  set: tb => (timebar = tb),
};
