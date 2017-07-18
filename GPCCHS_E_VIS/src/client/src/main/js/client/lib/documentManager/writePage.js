import _ from 'lodash/fp';
import { dirname } from 'path';
import { LOG_DOCUMENT_SAVE } from '../constants';

import { dc } from '../serverProcess/ipc';
import { createFolder } from '../common/fs';
import { writeDocument } from './io';
import validation from './validation';

import { getPage, getPageAbsolutePath } from '../store/reducers/pages';
import { getView } from '../store/reducers/views';

const preparePage = (state, page) => ({
  type: 'Page',
  timebarHeight: page.timebarHeight,
  timebarCollapsed: page.timebarCollapsed,
  title: page.title,
  sessionName: page.sessionName,
  domainName: page.domainName,
  views: page.views.map((viewId) => {
    const { oId, absolutePath } = getView(state, { viewId });
    const viewLocation = oId ? { oId } : { path: absolutePath };
    const geometry = _.find(_.propEq('i', viewId), page.layout);
    return {
      ...viewLocation,
      geometry: _.unset('i', geometry),
      hideBorders: page.hideBorders ? page.hideBorders : false,
      windowState: page.windowState ? page.windowState : 'Normalized',
    };
  }),
});

/**
 * Save plot view from state to file
 *
 * @param state
 * @param pageId
 * @param path
 * @param callback
 */
const writePageAs = (state, pageId, path, callback) => {
  const page = getPage(state, { pageId });
  if (!page) {
    callback(new Error('unknown page'));
    return;
  }
  createFolder(dirname(path), (err) => {
    if (err) {
      callback(err);
      return;
    }
    const savedPage = preparePage(state, page);
    const validationError = validation('page', savedPage);
    if (validationError) {
      callback(validationError);
      return;
    }
    writeDocument(path, savedPage, (errfs, oid) => {
      if (errfs) {
        callback(errfs);
        return;
      }
      dc.sendProductLog(LOG_DOCUMENT_SAVE, 'page', path);
      callback(null, oid);
    });
  });
};
/**
 * Save page from state to file
 *
 * @param state
 * @param pageId
 * @param path
 * @param callback
 */
const writePage = (state, pageId, path, callback) => {
  const page = getPage(state, { pageId });
  if (!page) {
    callback(new Error('Unknown page'));
  }
  const absolutePath = path || getPageAbsolutePath(state, { pageId });
  if (!absolutePath) {
    return callback(new Error('Unknown path for saving the page'));
  }
  return writePageAs(state, pageId, absolutePath, callback);
};


export default {
  writePage,
  writePageAs,
};
