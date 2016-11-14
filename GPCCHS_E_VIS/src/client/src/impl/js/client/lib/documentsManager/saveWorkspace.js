const { each, omit } = require('lodash');
const { writeFile } = require('fs');
const { join, dirname } = require('path');
const checkPath = require('./saveCommon');

function saveWorkspaceAs(state, path) {
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
  each(state.windows, (win) => {
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
      if (currentPage.path) {
        page.path = currentPage.path;
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
  each(state.timebars, (timebar) => {
    const tb = Object.assign({}, omit(timebar, 'timelines'), { type: 'timeBarConfiguration' });
    tb.timelines = [];
    each(timebar.timelines, (timelineId) => {
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

function saveWorkspace(state) {
  if (!state.workspace || !state.workspace.folder || !state.workspace.file) {
    return new Error('Unable to get path for saving workspace');
  }
  return saveWorkspaceAs(state, join(state.workspace.folder, state.workspace.file));
}

module.exports = { saveWorkspace, saveWorkspaceAs };
