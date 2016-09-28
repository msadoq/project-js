let timebar = {};

module.exports = {
  getTimebar: () => timebar,
  setTimebar: tb => (timebar = tb),
  resetTimebar: () => (timebar = {}),
};
