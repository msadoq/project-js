/* eslint no-underscore-dangle: 0 */
const _each = require('lodash/each');
const _omit = require('lodash/omit');
const _startsWith = require('lodash/startsWith');
const { writeFile } = require('fs');
const { join, dirname, relative } = require('path');
const { checkPath } = require('../common/fs');

function saveWorkspaceAs(state, path, useRelativePath, callback) {
  const errPath = checkPath(dirname(path));
  if (errPath) {
    return callback(`Unable to save workspace in folder ${dirname(path)}`);
  }
  const savedWindowsIds = [];
  const workspace = {
    type: 'WorkSpace',
    windows: [],
    timebars: [],
  };
  // windows
  _each(state.windows, (win, winIds) => {
    const current = {
      type: 'documentWindow',
      pages: [],
      title: (win.title.substring(0, 1)) ? win.title.substring(2) : win.title,
      geometry: win.geometry,
    };
    const err = {};
    // pages
    win.pages.forEach((pageId) => {
      if (!state.pages[pageId]) {
        return callback('Page Id is missing');
      }
      const page = {};
      const currentPage = state.pages[pageId];
      if (currentPage.absolutePath) {
        if (useRelativePath) {
          page.path = relative(dirname(path), currentPage.absolutePath);
        } else {
          page.path = currentPage.absolutePath;
          if (_startsWith(current.path, root)) {
            current.path = '/'.concat(relative(root, currentPage.absolutePath));
          }
        }
      } else if (currentPage.oId) {
        page.oId = currentPage.oId;
      } else if (useRelativePath && currentPage.path) {
        page.path = currentPage.path;
      } else {
        err[pageId] = 'Unsaved page: no path or oId';
        return callback('Unsaved page: no path or oId');
      }
      if (!state.timebars[currentPage.timebarId]) {
        err[pageId] = 'Unsaved page: unknown timebar';
        return callback('timelines missing');
      }
      page.timeBarId = state.timebars[currentPage.timebarId].id;
      current.pages.push(page);
    });
    workspace.windows.push(current);
    savedWindowsIds.push(winIds);
  });
  // timebars
  _each(state.timebars, (timebar) => {
    const tb = Object.assign({}, _omit(timebar, 'timelines'), { type: 'timeBarConfiguration' });
    tb.timelines = [];
    _each(timebar.timelines, (timelineId) => {
      if (!state.timelines[timelineId]) {
        return callback('timelines missing');
      }
      tb.timelines.push(state.timelines[timelineId]);
    });
    if (tb.masterId === null) {
      delete tb.masterId;
    }
    workspace.timebars.push(tb);
  });
  // save file
  writeFile(path, JSON.stringify(workspace, null, '  '), (err) => {
    if (err) {
      return callback(`Unable to save workspace in file ${path}`);
    }
    callback(null, savedWindowsIds);
  });
}

function saveWorkspace(state, useRelativePath, callback) {
  if (!state.hsc || !state.hsc.folder || !state.hsc.file) {
    return new Error('Unable to get path for saving workspace');
  }
  return saveWorkspaceAs(state,
                         join(state.hsc.folder, state.hsc.file), useRelativePath, callback);
}

module.exports = { saveWorkspace, saveWorkspaceAs };
