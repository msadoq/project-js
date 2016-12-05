/* eslint no-underscore-dangle: 0 */
const { writeFile } = require('fs');
const { dirname } = require('path');
const { checkPath } = require('../common/fs');
const _omit = require('lodash/omit');
const _reduce = require('lodash/reduce');
const globalConstants = require('common/constants');
const vivl = require('../../VIVL/main');

/**
 * Save view from state to file
 *
 * @param state
 * @param viewId
 * @param path
 * @returns Error or undefined
 */
function saveViewAs(state, viewId, path) {
  if (!state.views[viewId]) {
    return new Error('Unknown view id');
  }
  // TODO add case with new FMD path -> createDocument par DC
  const err = checkPath(dirname(path));
  if (err) {
    return err;
  }
  const conf = state.views[viewId].configuration;
  let view;
  const structureType = vivl(state.views[viewId].type, 'structureType')();
  switch (structureType) { // eslint-disable-line default-case
    case globalConstants.DATASTRUCTURETYPE_RANGE: {
      view = _omit(conf, 'axes');
      // Replace axes Id by label in entry point
      view.entryPoints.forEach((ep) => {
        if (ep.connectedDataX.axisId) {
          // eslint-disable-next-line no-param-reassign
          ep.connectedDataX.axisId = conf.axes[ep.connectedDataX.axisId].label;
        }
        if (ep.connectedDataY.axisId) {
          // eslint-disable-next-line no-param-reassign
          ep.connectedDataY.axisId = conf.axes[ep.connectedDataY.axisId].label;
        }
      });
      // Replace axes Id by label in grids
      view.grids.forEach((grid) => {
        if (grid.xAxisId) {
          // eslint-disable-next-line no-param-reassign
          grid.xAxisId = conf.axes[grid.xAxisId].label;
        }
        if (grid.yAxisId) {
          // eslint-disable-next-line no-param-reassign
          grid.yAxisId = conf.axes[grid.yAxisId].label;
        }
      });
      // Convert axes to array
      const axes = _reduce(conf.axes, (list, value) => {
        list.push(_omit(value, 'uuid'));
        return list;
      }, []);
      view.axes = axes;
      break;
    }
    default:
      view = conf;
  }

  writeFile(path, JSON.stringify(view, null, '  '), (errWrite) => {
    if (errWrite) {
      return new Error(`Unable to save view ${view.title} in file ${path}`);
    }
  });
}

/**
 * Save view from state to file
 *
 * @param state
 * @param viewId
 * @returns Error or undefined
 */
function saveView(state, viewId) {
  if (!state.views[viewId]) {
    return new Error('Unknown view id');
  }
  if (!state.views[viewId].isModified) {
    return;
  }
  const absPath = state.views[viewId].absolutePath;
  if (!absPath) {
    return new Error('Unknown path for saving text view');
  }
  return saveViewAs(state, viewId, absPath);
}

module.exports = { saveViewAs, saveView };
