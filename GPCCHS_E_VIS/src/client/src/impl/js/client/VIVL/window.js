/* eslint-disable global-require */
const PlotView = require('./PlotView/window');
const TextView = require('./TextView/window');
// const Primus = require('./primus');

const supportedView = { PlotView, TextView };

module.exports = {
  component: (viewType) => {
    if (!supportedView[viewType]) {
      return undefined;
    }
    return supportedView[viewType].component;
  },
};
