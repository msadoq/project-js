/* eslint no-underscore-dangle: 0 */
const _each = require('lodash/each');
const _omit = require('lodash/omit');
const _startsWith = require('lodash/startsWith');
const { writeFile } = require('fs');
const { join, dirname } = require('path');
const { checkPath } = require('../common/fs');

function saveWorkspaceAs(state, path, useRelativePath = false) {
  const errPath = checkPath(dirname(path));
  if (errPath) {
    return new Error(`Unable to save workspace in folder ${dirname(path)}`);
  }

  const workspace = {
    type: 'WorkSpace',
    windows: [],
    timebars: [],
  };
  // windows
  _each(state.windows, (win) => {
    const current = {
      type: 'documentWindow',
      pages: [],
      title: win.title,
      geometry: win.geometry,
    };
    const err = {};
    // pages
    win.pages.forEach((pageId) => {
      if (!state.pages[pageId]) {
        return;
      }
      const page = {};
      const currentPage = state.pages[pageId];
      if (currentPage.absolutePath) {
        if (useRelativePath) {
          page.path = path.relative(path, currentPage.absolutePath);
        } else {
          page.path = currentPage.absolutePath;
          if (_startsWith(current.path, root)) {
            current.path = '/'.concat(path.relative(root, currentPage.absolutePath));
          }
        }
      } else if (currentPage.oId) {
        page.oId = currentPage.oId;
      } else {
        err[pageId] = 'Unsaved page: no path or oId';
        return;
      }
      if (!state.timebars[currentPage.timebarId]) {
        err[pageId] = 'Unsaved page: unknown timebar';
        return;
      }
      page.timeBarId = state.timebars[currentPage.timebarId].id;
      current.pages.push(page);
    });
    workspace.windows.push(current);
  });
  // timebars
  _each(state.timebars, (timebar) => {
    const tb = Object.assign({}, _omit(timebar, 'timelines'), { type: 'timeBarConfiguration' });
    tb.timelines = [];
    _each(timebar.timelines, (timelineId) => {
      if (!state.timelines[timelineId]) {
        return;
      }
      tb.timelines.push(state.timelines[timelineId]);
    });
    workspace.timebars.push(tb);
  });
  // save file
  writeFile(path, JSON.stringify(workspace, null, '  '), (err) => {
    if (err) {
      return new Error(`Unable to save workspace in file ${path}`);
    }
  });
}

function saveWorkspace(state, useRelativePath = false) {
  if (!state.hsc || !state.hsc.folder || !state.hsc.file) {
    return new Error('Unable to get path for saving workspace');
  }
  return saveWorkspaceAs(state,
                         join(state.hsc.folder, state.hsc.file), useRelativePath);
}

module.exports = { saveWorkspace, saveWorkspaceAs };
