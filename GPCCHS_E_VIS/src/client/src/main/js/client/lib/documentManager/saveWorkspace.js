/* eslint no-underscore-dangle: 0 */
import _each from 'lodash/each';
import _omit from 'lodash/omit';
import _startsWith from 'lodash/startsWith';
import _cloneDeep from 'lodash/cloneDeep';
import { join, dirname, relative } from 'path';
import { LOG_DOCUMENT_SAVE } from 'common/constants';

import validation from './validation';
import { server } from '../mainProcess/ipc';
import { createFolder } from '../common/fs';
import { writeDocument } from './io';

const saveWorkspaceAs = fmdApi => (state, path, useRelativePath, callback) => {
  createFolder(dirname(path), (errFolderCreation) => {
    if (errFolderCreation) {
      return callback(errFolderCreation);
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
        title: win.title,
        geometry: win.geometry,
      };
      // pages
      win.pages.forEach((pageId) => {
        if (!state.pages[pageId]) {
          return callback('Page Id is missing');
        }
        const page = {};
        const currentPage = state.pages[pageId];
        if (currentPage.oId) {
          page.oId = currentPage.oId;
        } else if (useRelativePath && currentPage.path) {
          page.path = currentPage.path;
        } else if (currentPage.absolutePath) {
          if (useRelativePath) {
            page.path = relative(dirname(path), currentPage.absolutePath);
          } else {
            page.path = currentPage.absolutePath;
            if (_startsWith(current.path, '/')) {
              current.path = '/'.concat(relative('/', currentPage.absolutePath));
            }
          }
        } else {
          return callback(new Error('Unsaved page: no path or oId'));
        }
        page.timebarId = (state.timebars[currentPage.timebarUuid])
          ? state.timebars[currentPage.timebarUuid].id
          : 'TB1';
        current.pages.push(page);
      });
      workspace.windows.push(current);
      savedWindowsIds.push(winIds);
    });
    // timebars
    _each(state.timebars, (timebar) => {
      let tb = _cloneDeep(timebar);
      tb = Object.assign({}, _omit(tb, 'timelines'), { type: 'timeBarConfiguration' });
      tb.timelines = [];
      _each(timebar.timelines, (timelineId) => {
        if (!state.timelines[timelineId]) {
          return callback(new Error('timelines missing'));
        }
        tb.timelines.push(_cloneDeep(state.timelines[timelineId]));
      });
      if (tb.masterId === null) {
        delete tb.masterId;
      }
      workspace.timebars.push(tb);
    });
    // validation
    const validationError = validation('workspace', workspace);
    if (validationError) {
      return callback(validationError);
    }
    // save file
    writeDocument(fmdApi)(path, workspace, (err) => {
      if (err) {
        return callback(err);
      }
      server.sendProductLog(LOG_DOCUMENT_SAVE, 'workspace', path);
      callback(null, savedWindowsIds);
    });
  });
};

const saveWorkspace = fmdApi => (state, useRelativePath, callback) => {
  if (!state.hsc || !state.hsc.folder || !state.hsc.file) {
    return new Error('Unable to get path for saving workspace');
  }
  return saveWorkspaceAs(fmdApi)(
    state,
    join(state.hsc.folder, state.hsc.file),
    useRelativePath,
    callback
  );
};

export default {
  saveWorkspace,
  saveWorkspaceAs
};
