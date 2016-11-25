/* eslint-disable global-require */
import _memoize from 'lodash/memoize';

const PlotView = require('./PlotView/window');
const TextView = require('./TextView/window');
// const Primus = require('./primus');

const supportedView = { PlotView, TextView };

module.exports = {
  getComponent: _memoize((viewType) => {
    if (!supportedView[viewType]) {
      return undefined;
    }
    return supportedView[viewType].component;
  }),
};
