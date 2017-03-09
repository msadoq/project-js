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

import { getFirstTimebarId } from '../store/selectors/timebars';
import { simpleReadView } from './openView';
import { add as addMessage } from '../store/actions/messages';
import loadDocumentsInStore from './loadDocumentsInStore';

// utils
const addGlobalError = msg => addMessage('global', 'danger', msg);
const updateAllViews = transform => _.update('views', _.map(transform));

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

    const preparePageViews = updateAllViews(
      _.pipe(
        _.update('geometry', _.pick(['x', 'y', 'w', 'h', 'maxH', 'maxW'])),
        _.update('uuid', v4)
      )
    );

    const uuid = pageInfo.uuid || v4();
    return cb(null, {
      ...preparePageViews(page),
      ...pageInfo,
      properties, // Table with document props from FMD
      uuid,
      isModified: false,
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
      pageUuid: page.uuid,
      pageFolder: dirname(page.absolutePath),
    }), page.views);
    return readViews(viewsWithPageInfo, (errViews, views) => {
      if (errViews) {
        return cb(errViews);
      }
      const resetViewsInPage = _.set('views', []);
      return cb(null, {
        pages: [resetViewsInPage(page)],
        views,
      });
    });
  });
};

const setIfExist = _.curry((key, value, obj) => {
  if (_.has(key, obj)) {
    return obj;
  }
  return _.set(key, value, obj);
});

export const openPage = pageInfo => (dispatch, getState) => {
  readPageAndViews(pageInfo, (err, documents) => {
    if (err) {
      dispatch(addGlobalError(err));
      return;
    }
    const page = documents.pages[0];
    const path = page.absolutePath || page.path || page.oId;
    const documentsWithTimebarsMounted = _.update('pages', _.map(
      setIfExist('timebarUuid', getFirstTimebarId(getState()))
    ), documents);
    dispatch(loadDocumentsInStore(documentsWithTimebarsMounted));
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'page', path);
  });
};
