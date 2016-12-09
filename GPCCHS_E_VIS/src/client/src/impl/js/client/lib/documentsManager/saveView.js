/* eslint no-underscore-dangle: 0 */
const { writeFile } = require('fs');
const { dirname } = require('path');
const { checkPath } = require('../common/fs');
const _omit = require('lodash/omit');
const _values = require('lodash/values');
const _each = require('lodash/each');
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
      view.axes = _values(conf.axes);
      break;
    }
    default:
      view = conf;
  }
  // Remove entry point id
  _each(view.entryPoints, (value, index, entryPoints) => {
    entryPoints[index] = _omit(value, 'id'); // eslint-disable-line no-param-reassign
  });
  // Remove entry point timeline Id
  switch (structureType) { // eslint-disable-line default-case
    case globalConstants.DATASTRUCTURETYPE_LAST: {
      _each(view.entryPoints, (value, index, entryPoints) => {
        entryPoints[index].connectedData = _omit(value.connectedData, 'timelineId'); // eslint-disable-line no-param-reassign
      });
      break;
    }
    case globalConstants.DATASTRUCTURETYPE_RANGE: {
      _each(view.entryPoints, (value, index, entryPoints) => {
        entryPoints[index].connectedDataX = _omit(value.connectedDataX, 'timelineId'); // eslint-disable-line no-param-reassign
        entryPoints[index].connectedDataY = _omit(value.connectedDataY, 'timelineId'); // eslint-disable-line no-param-reassign
      });
      break;
    }
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
