let timebar = {};

module.exports = {
  getTimebars: () => timebar,
  setTimebars: tb => (timebar = tb),
  resetTimebars: () => (timebar = {}),
};
