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
function saveViewAs(viewConfiguration, viewType, path, callback) {
  if (!viewConfiguration) {
    return callback('Unknown view');
  }
  // TODO add case with new FMD path -> createDocument par DC
  checkPath(dirname(path)).then(() => {
    let view;
    const structureType = vivl(viewType, 'structureType')();
    switch (structureType) { // eslint-disable-line default-case
      case globalConstants.DATASTRUCTURETYPE_RANGE: {
        view = _omit(viewConfiguration, 'axes');
        view.axes = _values(viewConfiguration.axes);
        break;
      }
      default:
        view = viewConfiguration;
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
  })
  .catch(err => callback(err));
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
    return callback(null);
  }
  const absPath = state.views[viewId].absolutePath ? state.views[viewId].absolutePath
                                                   : state.views[viewId].oId;
  if (!absPath) {
    return callback('Unknown path for saving text view');
  }
  return saveViewAs(state.views[viewId].configuration, state.views[viewId].type, absPath, callback);
}

module.exports = { saveViewAs, saveView };
