/* eslint no-underscore-dangle: 0 */
const _findIndex = require('lodash/findIndex');
const _startsWith = require('lodash/startsWith');
const { writeFile } = require('fs');
const { dirname, relative } = require('path');
const { checkPath } = require('../common/fs');
const parameters = require('../common/parameters');

const root = parameters.FMD_ROOT;

/**
 * Save plot view from state to file
 *
 * @param state
 * @param viewId
 * @param path
 * @returns Error or undefined
 */
function savePageAs(state, pageId, path, useRelativePath = false) {
  if (!state.pages[pageId]) {
    return new Error('unknown page id');
  }

  // TODO add case with new FMD path -> createDocument par DC
  const err = checkPath(dirname(path));
  if (err) {
    return err;
  }
  const page = state.pages[pageId];
  const jsonPage = { type: 'Page', title: page.title, views: [] };
  page.views.forEach((id) => {
    // Get view definition in stateViews
    if (!state.views[id]) {
      return new Error(`Invalid view in page ${page.title}`);
    }
    const view = state.views[id];
    const current = {};
    if (useRelativePath) {
      current.path = relative(path, view.absolutePath);
    } else {
      current.path = view.absolutePath;
      if (_startsWith(current.path, root)) {
        current.path = '/'.concat(relative(root, view.absolutePath));
      }
    }
    current.oId = view.oId;
    const index = _findIndex(page.layout, item => item.i === id);
    if (index === -1) {
      return;
    }
    const layout = page.layout[index];
    current.geometry = {
      x: layout.x,
      y: layout.y,
      w: layout.w,
      h: layout.h,
    };
    current.hideBorders = (page.hideBorders ? page.hideBorders : false);
    current.windowState = (page.windowState ? page.windowState : 'Normalized');

    jsonPage.views.push(current);
  });
  // save file
  writeFile(path, JSON.stringify(jsonPage, null, '  '), (errfs) => {
    if (errfs) {
      return new Error(`Unable to save view ${page.title} in file ${path}`);
    }
  });
}
/**
 * Save page from state to file
 *
 * @param state
 * @param viewId
 * @param path
 * @returns Error or undefined
 */
function savePage(state, pageId, useRelativePath = false) {
  if (!state.pages[pageId]) {
    return new Error('unknown page id');
  }
  if (!state.pages[pageId].isModified) {
    return;
  }
  const path = state.pages[pageId].absolutePath ? state.pages[pageId].absolutePath
                                                : state.pages[pageId].oId;
  if (!path) {
    return new Error('Unknown path for saving the page');
  }
  return savePageAs(state, pageId, path, useRelativePath);
}


module.exports = { savePage, savePageAs };
