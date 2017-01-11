/* eslint no-underscore-dangle: 0 */
const _findIndex = require('lodash/findIndex');
const _startsWith = require('lodash/startsWith');
const { writeFile } = require('fs');
const { dirname, relative } = require('path');
const { checkPath } = require('../common/fs');
const parameters = require('common/parameters');

/**
 * Save plot view from state to file
 *
 * @param state
 * @param pageId
 * @param path
 * @param useRelativePath
 * @param callback
 * @returns Error or undefined
 */
function savePageAs(state, pageId, path, useRelativePath, callback) {
  if (!state.pages[pageId]) {
    callback('unknown page id');
  }
  checkPath(dirname(path)).then(() => {
    // TODO add case with new FMD path -> createDocument par DC
    const root = parameters.get('FMD_ROOT_DIR');
    const page = state.pages[pageId];
    const jsonPage = {
      type: 'Page',
      timebarHeight: page.timebarHeight,
      title: page.title,
      views: [],
    };
    page.views.forEach((id) => {
      // Get view definition in stateViews
      if (!state.views[id]) {
        return callback(`Invalid view in page ${page.title}`);
      }
      const view = state.views[id];
      const current = {};
      if (useRelativePath) {
        current.path = relative(dirname(path), view.absolutePath);
      } else {
        current.path = view.absolutePath;
        if (_startsWith(current.path, root)) {
          current.path = '/'.concat(relative(root, view.absolutePath));
        }
      }
      current.oId = view.oId;
      const index = _findIndex(page.layout, item => item.i === id);
      if (index === -1) {
        return callback('not fount page layout');
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
        return callback(`Unable to save view ${page.title} in file ${path}`);
      }
      return callback(null);
    });
  })
  .catch(err => callback(err));
}
/**
 * Save page from state to file
 *
 * @param state
 * @param pageId
 * @param useRelativePath
 * @param callback
 * @returns Error or undefined
 */
function savePage(state, pageId, useRelativePath, callback) {
  if (!state.pages[pageId]) {
    callback('unknown page id');
  }
  if (!state.pages[pageId].isModified) {
    callback('page is not to save');
  }
  const path = state.pages[pageId].absolutePath ? state.pages[pageId].absolutePath
                                                : state.pages[pageId].oId;
  if (!path) {
    return callback('Unknown path for saving the page');
  }
  return savePageAs(state, pageId, path, useRelativePath, callback);
}


module.exports = { savePage, savePageAs };
