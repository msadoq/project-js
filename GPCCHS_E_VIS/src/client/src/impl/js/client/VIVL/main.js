/* eslint-disable global-require */

const { get, isFunction } = require('lodash');
const PlotView = require('./PlotView/main');
const TextView = require('./TextView/main');

const supportedView = { PlotView, TextView };

module.exports = (viewType, functionName) => {
  const f = get(supportedView, [viewType, functionName]);
  if (!f || !isFunction(f)) {
    throw new Error(`invalid function ${functionName} for view type ${viewType}`)
  }

  return f;
};
