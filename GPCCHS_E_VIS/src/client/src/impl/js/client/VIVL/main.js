/* eslint-disable global-require */
const _ = require('lodash');
const PlotView = require('./PlotView/main');
const TextView = require('./TextView/main');

const supportedView = { PlotView, TextView };

const isValidFunction = function(viewType, functionName) {
  if (!supportedView[viewType]) {
    return false;
  }
  if (!_.isFunction(supportedView[viewType][functionName])) {
    return false;
  }
  return true
}

module.exports = (viewType, functionName) => {
  if (!isValidFunction) {
    throw new Error(`invalid function ${functionName} for view type ${viewType}`)
  }
  return supportedView[viewType][functionName];
}
