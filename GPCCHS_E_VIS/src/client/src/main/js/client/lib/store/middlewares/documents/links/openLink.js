// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move openLink middleware in documents
//  middleware
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Links can now be relative path or absolute
//  fmd path
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rewrite openLink middleware unit tests
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rename all create* middleware by make*
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Refacto openLink documents middleware
//  (serverProcess)
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { addBlankPage, focusPage } from 'store/actions/pages';
import { v4 } from 'uuid';
import * as types from 'store/types';
import { focusView } from 'store/actions/views';
import { get } from 'common/configurationManager';
import { getLink, getView, getViews } from 'store/reducers/views';
import { getPages } from 'store/reducers/pages';
import { getFocusedWindowId } from 'store/reducers/hsc';
import { add as addMessage } from 'store/actions/messages';
import { join, dirname } from 'path';

const isAbsolutePath = path => /^\//.test(path);

const openDocumentLink = (documentManager, docType) => ({ getState, dispatch }) => (action) => {
  const state = getState();
  const { viewId, linkId } = action.payload;
  const link = getLink(state, { viewId, linkId });
  const viewWithLink = getView(getState(), { viewId });
  const viewFolder = viewWithLink.absolutePath ? dirname(viewWithLink.absolutePath) : null;
  const fullPath = (
    isAbsolutePath(link.path) ? join(get('ISIS_DOCUMENTS_ROOT'), link.path) : join(viewFolder, link.path)
  );
  const getDocuments = docType === 'page' ? getPages : getViews;
  const focus = docType === 'page' ? focusPage : focusView;
  const documents = getDocuments(state);
  const doc =
    _.find({ absolutePath: link.path }, documents)
    || _.find({ absolutePath: fullPath }, documents);
  if (doc) {
    dispatch(focus(doc.uuid));
  } else if (docType === 'view') {
    const newPageId = v4();
    dispatch(addBlankPage(undefined, newPageId));
    dispatch(documentManager.openView({ path: link.path, viewFolder }, newPageId));
  } else if (docType === 'page') {
    const windowId = getFocusedWindowId(state);
    dispatch(documentManager.openPage({ path: link.path, viewFolder, windowId }));
  }
};

const makeOpenLinkMiddleware = documentManager => store => next => (action) => {
  if (action.type !== types.WS_ASK_OPEN_LINK) {
    return next(action);
  }
  const isView = type => /^.*View$/.test(type);
  const isPage = _.equals('Page');
  const { getState, dispatch } = store;
  const { viewId, linkId } = action.payload;
  const link = getLink(getState(), { viewId, linkId });
  if (!link) {
    return dispatch(addMessage(viewId, 'danger', 'Unknown link'));
  }
  const view = getView(getState(), { viewId });
  const viewFolder = view.absolutePath ? dirname(view.absolutePath) : null;
  documentManager.readDocumentType({ viewFolder, path: link.path }, (err, type) => {
    if (err) {
      dispatch(addMessage('global', 'danger', err));
      return;
    }
    if (isView(type)) {
      openDocumentLink(documentManager, 'view')(store)(action);
    } else if (isPage(type)) {
      openDocumentLink(documentManager, 'page')(store)(action);
    } else {
      dispatch(addMessage('global', 'danger', `Error, unknown type '${type}'`));
    }
  });
  return next(action);
};

export default makeOpenLinkMiddleware;
