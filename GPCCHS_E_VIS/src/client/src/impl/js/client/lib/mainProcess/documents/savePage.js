const { findIndex } = require('lodash');
const { writeFile } = require('fs');
const { join, dirname } = require('path');
const checkPath = require('./saveCommon');
/**
 * Save plot view from state to file
 *
 * @param state
 * @param viewId
 * @param path
 * @returns Error or undefined
 */
function savePageAs(state, pageId, path) {
  if (!state.pages[pageId]) {
    return new Error('unknown page id');
  }
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
    current.path = view.path;
    current.oId = view.oId;
    const index = findIndex(page.layout, item => item.i === id);
    if (index === -1) {
      console.log('invalid index');
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
function savePage(state, pageId) {
  if (!state.pages[pageId]) {
    return new Error('unknown page id');
  }
  const path = state.pages[pageId].path ? state.pages[pageId].path : state.pages[pageId].oId;
  if (!path || !state.workspace.folder) {
    return new Error('Unknown path for saving the page');
  }
  return savePageAs(state, pageId, join(state.workspace.folder, path));
}


module.exports = { savePage, savePageAs };
