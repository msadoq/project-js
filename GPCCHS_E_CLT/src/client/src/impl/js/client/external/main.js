/* eslint-disable global-require */
const _ = require('lodash');
const PlotView = require('./PlotView/main');
const TextView = require('./TextView/main');
const Primus = require('./primus');

const supportedView = { PlotView, TextView };
let functions = {};

const isValidFunction = function(viewType, functionName) {
  if (!supportedView[viewType]) {
    return false;
  }
  if (!_.isFunction(supportedView[viewType][functionName])) {
    return false;
  }
  return true
}

const getSchemaJson = function(viewType) {
  // if (functions[viewType] && functions[viewType].getSchemaJson) {
  //   return functions[viewType].getSchemaJson();
  // }
  if (!isValidFunction(viewType, 'getSchemaJson')) {
    return undefined;
  }
  // (functions[viewType] || (functions[viewType] = {})).getSchemaJson =
  //   supportedView[viewType].getSchemaJson;
  return supportedView[viewType].getSchemaJson();
}

const getConnectedDataFromState = function(viewType, configuration) {
  // if (functions[viewType] && functions[viewType].getConnectedDataFromState) {
  //   return functions[viewType].getConnectedDataFromState(configuration);
  // }
  if (!isValidFunction(viewType, 'getConnectedDataFromState')) {
    return undefined;
  }
  // (functions[viewType] || (functions[viewType] = {})).getConnectedDataFromState =
  //   supportedView[viewType].getConnectedDataFromState;
  return supportedView[viewType].getConnectedDataFromState(configuration);
}

const getExpectedInterval = function(viewType, lower, current, upper) {
  // if (functions[viewType] && functions[viewType].getExpectedInterval) {
  //   return functions[viewType].getExpectedInterval(lower, current, upper);
  // }
  if (!isValidFunction(viewType, 'getExpectedInterval')) {
    return undefined;
  }
  // (functions[viewType] || (functions[viewType] = {})).getExpectedInterval =
  //   supportedView[viewType].getExpectedInterval;
  return supportedView[viewType].getExpectedInterval(lower, current, upper);
}

const getDisplayedValues = function(viewType, stateLocalId, field, interval, remoteIdPayload) {
  // if (functions[viewType] && functions[viewType].getDisplayedValues) {
  //   return functions[viewType].getDisplayedValues(stateLocalId, field, interval, remoteIdPayload);
  // }
  if (!isValidFunction(viewType, 'getDisplayedValues')) {
    return undefined;
  }
  // (functions[viewType] || (functions[viewType] = {})).getDisplayedValues =
  //   supportedView[viewType].getDisplayedValues;
  return supportedView[viewType].getDisplayedValues(stateLocalId, field, interval, remoteIdPayload);
}

module.exports = {
  getSchemaJson,
  getConnectedDataFromState,
  getExpectedInterval,
  getDisplayedValues,
}
