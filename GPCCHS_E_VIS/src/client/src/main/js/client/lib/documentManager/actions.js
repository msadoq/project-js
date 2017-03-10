import _ from 'lodash/fp';
import { dirname, basename } from 'path';

import { LOG_DOCUMENT_OPEN } from 'common/constants';
import getLogger from 'common/log';

import { updatePath as updateWorkspacePath, isWorkspaceOpening, closeWorkspace } from '../store/actions/hsc';

import { server } from '../mainProcess/ipc';

import { add as addMessage } from '../store/actions/messages';
import simple from '../store/simpleActionCreator';
import * as types from '../store/types';

import { getFirstTimebarId } from '../store/selectors/timebars';
import { createBlankWorkspace } from './createBlankWorkspace';
import { simpleReadView } from './readView';
import { readPageAndViews } from './readPage';
import { readWorkspacePagesAndViews } from './readWorkspace';

const loadDocuments = simple(types.WS_LOAD_DOCUMENTS, 'documents');

const addGlobalError = msg => addMessage('global', 'danger', msg);
const addDangerMessage = (focusedPageId, msg) => addMessage(focusedPageId, 'danger', msg);

// --- open a view ---------------------------------------------------------- //
export const openView = viewInfo => (dispatch) => {
  simpleReadView(viewInfo, (err, view) => {
    if (err) {
      dispatch(addDangerMessage(view.pageUuid, err));
      return;
    }
    dispatch(loadDocuments({ views: [view] }));
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'view', view.absolutePath);
  });
};
// -------------------------------------------------------------------------- //

// --- open a page ---------------------------------------------------------- //
const setIfAbsent = _.curry((key, value, obj) => {
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
      setIfAbsent('timebarUuid', getFirstTimebarId(getState()))
    ), documents);
    dispatch(loadDocuments(documentsWithTimebarsMounted));
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'page', path);
  });
};
// -------------------------------------------------------------------------- //

// --- open a workspace ----------------------------------------------------- //
const logger = getLogger('documentManager:readWorkspace');
const logLoadedDocumentsCount = (documents) => {
  const count = {
    w: _.size(documents.windows),
    p: _.size(documents.pages),
    v: _.size(documents.views),
  };
  logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);
};

export const openWorkspace = (workspaceInfo, cb = _.noop) => (dispatch) => {
  const path = workspaceInfo.absolutePath;
  dispatch(isWorkspaceOpening(true));
  readWorkspacePagesAndViews(workspaceInfo, (err, documents) => {
    if (err) {
      dispatch(isWorkspaceOpening(false));
      dispatch(addGlobalError(err));
      return cb(err);
    }

    dispatch(closeWorkspace());
    dispatch(isWorkspaceOpening(false));
    dispatch(loadDocuments(documents));

    logLoadedDocumentsCount(documents);
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'workspace', path);

    dispatch(updateWorkspacePath(dirname(path), basename(path)));
    return cb(null);
  });
};
// -------------------------------------------------------------------------- //


// --- open a blank workspace ----------------------------------------------- //
export const openBlankWorkspace = () => (dispatch) => {
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'workspace', 'new workspace');
  dispatch(closeWorkspace());
  dispatch(loadDocuments(createBlankWorkspace()));
};
// -------------------------------------------------------------------------- //
