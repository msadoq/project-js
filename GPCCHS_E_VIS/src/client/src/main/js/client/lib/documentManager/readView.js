import async from 'async';
import { v4 } from 'uuid';

import { LOG_DOCUMENT_OPEN } from 'common/constants';
import fmdApi from '../common/fmd';
import { readDocument } from './io';
import fs from '../common/fs';
import validation from './validation';
import {
  isViewTypeSupported,
  getSchema,
  getViewModule,
} from '../viewManager';
import { add as addMessage } from '../store/actions/messages';
import { server } from '../mainProcess/ipc';
import loadDocumentsInStore from './loadDocumentsInStore';

const addDangerMessage = (focusedPageId, msg) => addMessage(focusedPageId, 'danger', msg);

export const simpleReadView = (viewInfo, cb) => {
  const { path, oId, absolutePath, pageFolder } = viewInfo;
  readDocument(fmdApi)(pageFolder, path, oId, absolutePath, (err, viewContent) => {
    if (err) {
      return cb(err);
    }
    if (!isViewTypeSupported(viewContent.type)) {
      return cb(new Error(`Unsupported view type '${viewContent.type}'`), viewInfo);
    }

    const schema = getSchema(viewContent.type);

    const validationError = validation(viewContent.type, viewContent, schema);
    if (validationError) {
      return cb(validationError);
    }

    const configuration =
      getViewModule(viewContent.type)
        .prepareConfigurationForStore(viewContent);

    const uuid = viewInfo.uuid || v4();
    return cb(null, {
      ...viewInfo,
      type: viewContent.type,
      path: viewInfo.path,
      oId: viewInfo.oId,
      absolutePath: fs.getPath(), // ugly
      configuration,
      uuid,
    });
  });
};

export const loadViewInStore = viewInfo => (dispatch) => {
  simpleReadView(viewInfo, (err, view) => {
    if (err) {
      dispatch(addDangerMessage(view.pageId, err));
      return;
    }
    dispatch(loadDocumentsInStore({ views: [view] }));
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'view', view.absolutePath);
  });
};

// used by readPage
export const readViews = (viewsInfo, cb) => async.map(viewsInfo, simpleReadView, cb);
