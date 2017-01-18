/* eslint-disable global-require */
import _memoize from 'lodash/memoize';
import PlotView from './PlotView/window/PlotView';
import TextView from './TextView/window/TextViewContainer';
import DynamicView from './DynamicView/window/DynamicViewContainer';

const supportedView = { PlotView, TextView, DynamicView };

module.exports = {
  getComponent: _memoize((viewType) => {
    if (!supportedView[viewType]) {
      return undefined;
    }
    return supportedView[viewType];
  }),
};
