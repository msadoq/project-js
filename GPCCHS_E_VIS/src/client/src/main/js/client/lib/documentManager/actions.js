import _ from 'lodash/fp';
import { dirname, basename } from 'path';

import { LOG_DOCUMENT_OPEN } from 'common/constants';
import getLogger from 'common/log';
import parameters from 'common/parameters';

import { updatePath as updateWorkspacePath, isWorkspaceOpening, closeWorkspace } from '../store/actions/hsc';

import { server } from '../mainProcess/ipc';

import simple from '../store/simpleActionCreator';
import { add as addMessage } from '../store/actions/messages';
import * as types from '../store/types';

import { getFirstTimebarId } from '../store/reducers/timebars';
import { createBlankWorkspace } from './createBlankWorkspace';
import { simpleReadView } from './readView';
import { readPageAndViews } from './readPage';
import { readWorkspacePagesAndViews } from './readWorkspace';
import { getSession } from '../store/reducers/sessions';

const addGlobalError = msg => addMessage('global', 'danger', msg);
const addDangerMessage = (focusedPageId, msg) => addMessage(focusedPageId, 'danger', msg);

const reload = simple(types.WS_VIEW_RELOAD, 'viewId', 'view');

export const reloadView = (viewId, absolutePath) => (dispatch) => {
  simpleReadView({ absolutePath }, (err, view) => {
    if (err) {
      return dispatch(addMessage(
        viewId,
        'danger',
        'Invalid View file selected'
      ));
    }

    dispatch(reload(viewId, _.set('uuid', viewId, view)));
    return dispatch(addMessage(
      viewId,
      'success',
      'View reloaded'
    ));
  });
};

// --- open a view ---------------------------------------------------------- //
export const openView = (viewInfo, pageId) => (dispatch) => {
  simpleReadView(viewInfo, (err, view) => {
    if (err) {
      dispatch(addDangerMessage(view.pageUuid, err));
      return;
    }
    dispatch({
      type: types.WS_VIEW_OPEN,
      payload: { view, pageId },
    });
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'view', view.absolutePath);
  });
};
// -------------------------------------------------------------------------- //

// --- open a page ---------------------------------------------------------- //
export const openPage = pageInfo => (dispatch, getState) => {
  readPageAndViews(pageInfo, (err, documents) => {
    if (err) {
      dispatch(addGlobalError(err));
      return;
    }
    const page = documents.pages[0];
    const firstTimebarId = getFirstTimebarId(getState());
    dispatch({
      type: types.WS_PAGE_OPEN,
      payload: {
        windowId: page.windowId,
        views: documents.views,
        page: _.set('timebarUuid', firstTimebarId, page),
      },
    });

    const path = page.absolutePath || page.path || page.oId;
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'page', path);
  });
};
// -------------------------------------------------------------------------- //

// --- open a workspace ----------------------------------------------------- //
const logger = getLogger('documentManager:openWorkspace');
const logLoadedDocumentsCount = (documents) => {
  const count = {
    w: _.size(documents.windows),
    p: _.size(documents.pages),
    v: _.size(documents.views),
  };
  logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);
};

const prepareTimebar = (timelines, state) => (timebar) => {
  if (!timebar.masterId) {
    return timebar;
  }
  const masterTimeline = _.find(['id', timebar.masterId], timelines);
  if (!masterTimeline) {
    return timebar;
  }
  const session = getSession(state, { sessionName: masterTimeline.sessionName });
  if (!session) {
    return timebar;
  }
  const current = session.timestamp.ms;
  const lower = current - parameters.get('VISU_WINDOW_LOW_MS');
  const upper = current + parameters.get('VISU_WINDOW_UP_MS');
  return {
    ...timebar,
    visuWindow: {
      current,
      lower,
      upper,
      defaultWidth: parameters.get('VISU_WINDOW_DEFAULT_WIDTH'),
    },
    slideWindow: { lower, upper },
    rulerStart: Number(lower) - (5 * 60000),
  };
};

export const openWorkspace = (workspaceInfo, cb = _.noop) => (dispatch, getState) => {
  const path = workspaceInfo.absolutePath;
  dispatch(isWorkspaceOpening(true));
  readWorkspacePagesAndViews(workspaceInfo, (err, documents) => {
    if (err) {
      dispatch(addGlobalError(err));
      dispatch(isWorkspaceOpening(false));
      return cb(err);
    }

    dispatch(closeWorkspace());
    const payload = {
      ...documents,
      timebars: documents.timebars.map(prepareTimebar(documents.timelines, getState())),
    };
    dispatch({ type: types.WS_WORKSPACE_OPEN, payload });
    dispatch(isWorkspaceOpening(false));

    logLoadedDocumentsCount(documents);
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'workspace', path);

    dispatch(updateWorkspacePath(dirname(path), basename(path)));
    return cb(null);
  });
};
// -------------------------------------------------------------------------- //


// --- open a blank workspace ----------------------------------------------- //
export const openBlankWorkspace = ({ keepMessages } = {}) => (dispatch) => {
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'workspace', 'new workspace');
  dispatch(closeWorkspace(keepMessages));
  dispatch({ type: types.WS_WORKSPACE_OPEN, payload: createBlankWorkspace() });
};
// -------------------------------------------------------------------------- //
