/* eslint no-underscore-dangle: 0 */
const { writeFile } = require('fs');
const { dirname } = require('path');
const { checkPath } = require('../common/fs');

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
  const view = state.views[viewId].configuration;
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
