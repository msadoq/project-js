import _ from 'lodash/fp';
import { dirname } from 'path';
import async from 'async';
import { v4 } from 'uuid';
import { LOG_DOCUMENT_OPEN } from 'common/constants';

import { server } from '../mainProcess/ipc';
import fmdApi from '../common/fmd';
import { readDocument } from './io';
import fs from '../common/fs';
import validation from './validation';

import { simpleReadView } from './readView';
import { add as addMessage } from '../store/actions/messages';
import loadDocumentsInStore from './loadDocumentsInStore';

const addGlobalError = msg => addMessage('global', 'danger', msg);

export const simpleReadPage = (pageInfo, cb) => {
  const { workspaceFolder, path, oId, absolutePath } = pageInfo;
  readDocument(fmdApi)(workspaceFolder, path, oId, absolutePath, (err, page, properties) => {
    if (err) {
      return cb(err);
    }
    const validationError = validation('page', page);
    if (validationError) {
      return cb(validationError);
    }

    const updateAllGeometries = transform => _.update('views', _.map(_.update('geometry', transform)));
    const filterGeometries = updateAllGeometries(_.pick(['x', 'y', 'w', 'h', 'maxH', 'maxW']));

    const uuid = pageInfo.uuid || v4();
    return cb(null, {
      ...filterGeometries(page),
      ...pageInfo,
      properties, // Table with document props from FMD
      uuid,
      absolutePath: fs.getPath(), // ugly
    });
  });
};

const readViews = (viewsInfo, cb) => async.map(viewsInfo, simpleReadView, cb);

export const readPageAndViews = (pageInfo, cb) => {
  simpleReadPage(pageInfo, (errPage, page) => {
    if (errPage) {
      return cb(errPage);
    }
    const viewsWithPageInfo = _.map(v => ({
      ...v,
      pageId: page.uuid,
      pageFolder: dirname(page.absolutePath),
    }), page.views);
    return readViews(viewsWithPageInfo, (errViews, views) => {
      if (errViews) {
        return cb(errViews);
      }
      const clearViews = _.set('views', []);
      return cb(null, { pages: [clearViews(page)], views });
    });
  });
};

export const loadPageInStore = pageInfo => (dispatch) => {
  readPageAndViews(pageInfo, (err, documents) => {
    if (err) {
      dispatch(addGlobalError(err));
      return;
    }
    const page = documents.pages[0];
    const path = page.absolutePath || page.path || page.oId;
    dispatch(loadDocumentsInStore(documents));
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'page', path);
  });
};
