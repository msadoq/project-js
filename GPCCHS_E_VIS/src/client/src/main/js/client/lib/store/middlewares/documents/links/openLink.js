import _ from 'lodash/fp';
import { join, dirname } from 'path';
import { v4 } from 'uuid';
import * as types from '../../../types';
import { focusView } from '../../../actions/views';
import { addBlankPage, focusPage } from '../../../actions/pages';
import { getLink, getView, getViews } from '../../../reducers/views';
import { getPages } from '../../../reducers/pages';
import { getFocusedWindowId } from '../../../reducers/hsc';
import { add as addMessage } from '../../../actions/messages';
import { get } from '../../../../common/configurationManager';

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
  const nextAction = next(action);
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
  return nextAction;
};

export default makeOpenLinkMiddleware;
