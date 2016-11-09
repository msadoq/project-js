const { omit } = require('lodash');
const { writeFile } = require('fs');
const { join, dirname } = require('path');
const checkPath = require('./saveCommon');


function checkView(state, viewId, type) {
  if (!state.views[viewId]) {
    return new Error(`unknown ${type} id`);
  }
  if (state.views[viewId].type !== type) {
    return new Error('The view to save is not a plot view');
  }
}
function viewType(state, viewId) {
  if (!state.views[viewId]) {
    return new Error('unknown view id');
  }
  return state.views[viewId].type;
}

/**
 * Save plot view from state to file
 *
 * @param state
 * @param viewId
 * @param path
 * @returns Error or undefined
 */
function savePlotViewAs(state, viewId, path) {
  let err = checkView(state, viewId, 'PlotView');
  if (err) {
    return err;
  }
  err = checkPath(dirname(path));
  if (err) {
    return err;
  }
  const view = state.views[viewId].configuration;
  const jsonPlot = omit(view, 'entryPoints');
  jsonPlot.plotViewEntryPoints = view.entryPoints;

  writeFile(path, JSON.stringify(jsonPlot, null, '  '), (errfs) => {
    if (errfs) {
      return new Error(`Unable to save view ${view.title} in file ${path}`);
    }
  });
}
/**
 * Save plot view from state to file
 *
 * @param state
 * @param viewId
 * @param path
 * @returns Error or undefined
 */
function savePlotView(state, viewId) {
  const err = checkView(state, viewId, 'PlotView');
  if (err) {
    return err;
  }
  const relativePath = state.views[viewId].path ? state.views[viewId].path
                                                : state.views[viewId].oId;
  if (!relativePath || !state.workspace.folder) {
    console.log(relativePath, state.workspace.folder);
    return new Error('Unknown path for saving plot view');
  }
  const absPath = join(state.workspace.folder, relativePath);
  return savePlotViewAs(state, viewId, absPath);
}


/**
 * Save text view from state to file
 *
 * @param state
 * @param viewId
 * @param path
 * @returns Error or undefined
 */
function saveTextViewAs(state, viewId, path) {
  let err = checkView(state, viewId, 'TextView');
  if (err) {
    return err;
  }
  err = checkPath(dirname(path));
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
 * Save text view from state to file
 *
 * @param state
 * @param viewId
 * @returns Error or undefined
 */
function saveTextView(state, viewId) {
  const relativePath = state.views[viewId].path ? state.views[viewId].path
                                                : state.views[viewId].oId;
  if (!relativePath || !state.workspace.folder) {
    return new Error('Unknown path for saving text view');
  }
  const absPath = join(state.workspace.folder, relativePath);
  return saveTextViewAs(state, viewId, absPath);
}

function saveViewAs(state, viewId, path) {
  const type = viewType(state, viewId);
  switch (type) {
    case 'TextView':
      return saveTextViewAs(state, viewId, path);
    case 'PlotView':
      return savePlotViewAs(state, viewId, path);
    default:
      return new Error('Unknown view id or type');
  }
}

function saveView(state, viewId) {
  const type = viewType(state, viewId);
  switch (type) {
    case 'TextView':
      return saveTextView(state, viewId);
    case 'PlotView':
      return savePlotView(state, viewId);
    default:
      return new Error('Unknown view id or type');
  }
}
module.exports = { saveViewAs, saveView };
