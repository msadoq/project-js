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
import { getRootDir } from '../../../../common/fmd';

const isRelativePath = path => /^\./.test(path);
const isAbsolutePath = _.complement(isRelativePath);

const openViewLink = documentManager => ({ getState, dispatch }) => (action) => {
  const state = getState();
  const { viewId, linkId } = action.payload;
  const link = getLink(state, { viewId, linkId });
  const viewWithLink = getView(getState(), { viewId });
  const viewFolder = viewWithLink.absolutePath ? dirname(viewWithLink.absolutePath) : null;
  const fullPath = (
    isAbsolutePath(link.path) ? join(getRootDir(), link.path) : join(viewFolder, link.path)
  );
  const views = getViews(state);
  const view =
    _.find({ absolutePath: link.path }, views)
    || _.find({ absolutePath: fullPath }, views);
  if (view) {
    dispatch(focusView(view.uuid));
  } else {
    const newPageId = v4();
    dispatch(addBlankPage(undefined, newPageId));
    dispatch(documentManager.openView({ path: link.path, viewFolder }, newPageId));
  }
};

const openPageLink = documentManager => ({ getState, dispatch }) => (action) => {
  const state = getState();
  const { viewId, linkId } = action.payload;
  const link = getLink(state, { viewId, linkId });
  const viewWithLink = getView(getState(), { viewId });
  const viewFolder = viewWithLink.absolutePath ? dirname(viewWithLink.absolutePath) : null;
  const fullPath = (
    isAbsolutePath(link.path) ? join(getRootDir(), link.path) : join(viewFolder, link.path)
  );
  const pages = getPages(state);
  const page =
    _.find({ absolutePath: link.path }, pages)
    || _.find({ absolutePath: fullPath }, pages);
  if (page) {
    dispatch(focusPage(page.uuid));
  } else {
    const windowId = getFocusedWindowId(state);
    dispatch(documentManager.openPage({ path: link.path, viewFolder, windowId }));
  }
};

const createOpenLinkMiddleware = documentManager => store => next => (action) => {
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
      openViewLink(documentManager)(store)(action);
    } else if (isPage(type)) {
      openPageLink(documentManager)(store)(action);
    } else {
      dispatch(addMessage('global', 'danger', `Error, unknown type '${type}'`));
    }
  });
  return nextAction;
};


export default createOpenLinkMiddleware;
