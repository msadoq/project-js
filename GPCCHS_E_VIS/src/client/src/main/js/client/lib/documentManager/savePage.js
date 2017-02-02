/* eslint no-underscore-dangle: 0 */
import _findIndex from 'lodash/findIndex';
import _startsWith from 'lodash/startsWith';
import { dirname, relative } from 'path';
import {
  LOG_DOCUMENT_SAVE
} from 'common/constants';

import { server } from '../mainProcess/ipc';
import { createFolder } from '../common/fs';
import { writeDocument } from './io';
import validation from './validation';

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
 // eslint-disable-next-line no-unused-vars
const savePageAs = fmdApi => (state, pageId, path, useRelativePath, callback) => {
  if (!state.pages[pageId]) {
    return callback('unknown page id');
  }
  createFolder(dirname(path), (err) => {
    if (err) {
      return callback(err);
    }
    const root = fmdApi.getRootDir();
    const page = state.pages[pageId];
    const savedPage = {
      type: 'Page',
      timebarHeight: page.timebarHeight,
      timebarCollapsed: page.timebarCollapsed,
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
      if (view.oId) {
        current.oId = view.oId;
      } else if (useRelativePath) {
        current.path = relative(dirname(path), view.absolutePath);
      } else {
        current.path = view.absolutePath;
        if (_startsWith(current.path, root)) {
          current.path = '/'.concat(relative(root, view.absolutePath));
        }
      }
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
        maxH: layout.maxH,
        maxW: layout.maxW,
      };
      current.hideBorders = (page.hideBorders ? page.hideBorders : false);
      current.windowState = (page.windowState ? page.windowState : 'Normalized');

      savedPage.views.push(current);
    });
    // validation
    const validationError = validation('page', savedPage);
    if (validationError) {
      return callback(validationError);
    }
    // save file
    writeDocument(fmdApi)(path, savedPage, (errfs, oid) => {
      if (errfs) {
        return callback(errfs);
      }

      server.sendProductLog(LOG_DOCUMENT_SAVE, 'page', path);

      return callback(null, oid);
    });
  });
};
/**
 * Save page from state to file
 *
 * @param state
 * @param pageId
 * @param useRelativePath
 * @param callback
 * @returns Error or undefined
 */
const savePage = fmdApi => (state, pageId, useRelativePath, callback) => {
  if (!state.pages[pageId]) {
    callback('unknown page id');
  }
  const path = state.pages[pageId].absolutePath ? state.pages[pageId].absolutePath
                                                : state.pages[pageId].oId;
  if (!path) {
    return callback('Unknown path for saving the page');
  }
  return savePageAs(fmdApi)(state, pageId, path, useRelativePath, callback);
};


export default {
  savePage,
  savePageAs,
};
