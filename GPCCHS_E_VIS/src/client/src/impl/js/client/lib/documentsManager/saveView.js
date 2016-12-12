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
 * @param callback
 * @returns Error or undefined
 */
function saveViewAs(state, viewId, path, callback) {
  if (!state.views[viewId]) {
    return callback('Unknown view id');
  }
  // TODO add case with new FMD path -> createDocument par DC
  const err = checkPath(dirname(path));
  if (err) {
    return callback(err);
  }
  const conf = state.views[viewId].configuration;
  conf.title = (conf.title.substring(0, 1)) ? conf.title.substring(2) : conf.title;
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

  writeFile(path, JSON.stringify(view, null, '  '), (errWrite) => {
    if (errWrite) {
      return callback(`Unable to save view ${view.title} in file ${path}`);
    }
    return callback(null);
  });
}

/**
 * Save view from state to file
 *
 * @param state
 * @param viewId
 * @param callback
 * @returns Error or undefined
 */
function saveView(state, viewId, callback) {
  if (!state.views[viewId]) {
    return callback('Unknown view id');
  }
  if (!state.views[viewId].isModified) {
    return callback('view is not modified');
  }
  const absPath = state.views[viewId].absolutePath;
  if (!absPath) {
    return callback('Unknown path for saving text view');
  }
  return saveViewAs(state, viewId, absPath, callback);
}

module.exports = { saveViewAs, saveView };
