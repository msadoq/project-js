import _findIndex from 'lodash/findIndex';
import _startsWith from 'lodash/startsWith';
import { dirname, relative } from 'path';
import {
  LOG_DOCUMENT_SAVE,
} from 'common/constants';

import { server } from '../mainProcess/ipc';
import { createFolder } from '../common/fs';
import { writeDocument } from './io';
import { getRootDir } from '../common/fmd';
import validation from './validation';

import { getPage, getPageAbsolutePath } from '../store/reducers/pages';
import { getView } from '../store/reducers/views';

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
const savePageAs = (state, pageId, path, useRelativePath, callback) => {
  const page = getPage(state, { pageId });
  if (!page) {
    callback('unknown page');
    return;
  }
  createFolder(dirname(path), (err) => {
    if (err) {
      callback(err);
      return;
    }
    const root = getRootDir();
    const savedPage = {
      type: 'Page',
      timebarHeight: page.timebarHeight,
      timebarCollapsed: page.timebarCollapsed,
      title: page.title,
      views: [],
      panels: page.panels,
    };
    page.views.forEach((id) => {
      // Get view definition in stateViews
      const view = getView(state, { viewId: id });
      if (!view) {
        callback(`Invalid view in page ${page.title}`);
        return;
      }
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
        callback('not fount page layout');
        return;
      }
      const geometry = page.layout[index];
      current.geometry = {
        x: geometry.x,
        y: geometry.y,
        w: geometry.w,
        h: geometry.h,
        maxH: geometry.maxH,
        maxW: geometry.maxW,
        collapsed: geometry.collapsed,
        maximized: geometry.maximized,
      };
      current.hideBorders = (page.hideBorders ? page.hideBorders : false);
      current.windowState = (page.windowState ? page.windowState : 'Normalized');

      savedPage.views.push(current);
    });
    // validation
    const validationError = validation('page', savedPage);
    if (validationError) {
      callback(validationError);
      return;
    }
    // save file
    writeDocument(path, savedPage, (errfs, oid) => {
      if (errfs) {
        callback(errfs);
        return;
      }

      server.sendProductLog(LOG_DOCUMENT_SAVE, 'page', path);

      callback(null, oid);
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
const savePage = (state, pageId, useRelativePath, callback) => {
  const page = getPage(state, { pageId });
  if (!page) {
    callback('unknown page');
  }
  const absolutePath = getPageAbsolutePath(state, { pageId });
  if (!absolutePath) {
    return callback('Unknown path for saving the page');
  }
  return savePageAs(state, pageId, absolutePath, useRelativePath, callback);
};


export default {
  savePage,
  savePageAs,
};
