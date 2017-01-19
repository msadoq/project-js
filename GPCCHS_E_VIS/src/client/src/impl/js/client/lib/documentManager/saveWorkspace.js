/* eslint no-underscore-dangle: 0 */
import _each from 'lodash/each';
import _omit from 'lodash/omit';
import _startsWith from 'lodash/startsWith';
import _cloneDeep from 'lodash/cloneDeep';
import { join, dirname, relative } from 'path';
import { productLog } from 'common/log';
import {
  LOG_DOCUMENT_SAVE
} from 'common/constants';

import { checkPath } from '../common/fs';

const saveWorkspaceAs = fmdApi => (state, path, useRelativePath, callback) => {
  checkPath(dirname(path)).then(() => {
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
      const err = {};
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
          err[pageId] = 'Unsaved page: no path or oId';
          return callback('Unsaved page: no path or oId', null);
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
          return callback('timelines missing', null);
        }
        tb.timelines.push(_cloneDeep(state.timelines[timelineId]));
      });
      if (tb.masterId === null) {
        delete tb.masterId;
      }
      workspace.timebars.push(tb);
    });
    // save file
    fmdApi.writeJson(path, workspace, (err) => {
      if (err) {
        return callback(`Unable to save workspace in file ${path}`);
      }
      productLog(LOG_DOCUMENT_SAVE, 'workspace', path);
      callback(null, savedWindowsIds);
    });
  })
  .catch(err => callback(err));
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
