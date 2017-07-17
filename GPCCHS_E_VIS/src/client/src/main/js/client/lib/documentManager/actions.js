import _ from 'lodash/fp';
import { dirname, basename } from 'path';

import { LOG_DOCUMENT_OPEN } from '../constants';
import getLogger from '../common/logManager';
import parameters from '../common/configurationManager';

import { updatePath as updateWorkspacePath, isWorkspaceOpening, closeWorkspace, setWorkspaceModified } from '../store/actions/hsc';

import { dc } from '../serverProcess/ipc';

import simple from '../store/helpers/simpleActionCreator';
import { add as addMessage } from '../store/actions/messages';
import * as types from '../store/types';

import { getFirstTimebarId } from '../store/reducers/timebars';
import { getViewWithConfiguration } from '../viewManager';
import readView from './readView';

import { readPageAndViews } from './readPage';
import { readWorkspacePagesAndViews } from './readWorkspace';
import { getSession } from '../store/reducers/sessions';

import { writeWorkspace } from './writeWorkspace';
import { writePage } from './writePage';
import { writeView } from './writeView';
import {
  setModified as setPageModified,
  setPageOid,
  updatePath as updatePagePath,
  updateAbsolutePath as updatePageAbsolutePath,
} from '../store/actions/pages';

import {
  setModified as setViewModified,
  setViewOid,
  updatePath as updateViewPath,
  updateAbsolutePath as updateViewAbsolutePath,
} from '../store/actions/views';

const addGlobalError = msg => addMessage('global', 'danger', msg);

const reload = simple(types.WS_VIEW_RELOAD, 'viewId', 'view');

export const reloadView = (viewId, absolutePath) => (dispatch) => {
  readView.simpleReadView({ absolutePath }, (err, view) => {
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
  readView.simpleReadView(viewInfo, (ignoredErr, view) => {
    if (view.error) {
      dispatch(addGlobalError(view.error));
      return;
    }
    dispatch({
      type: types.WS_VIEW_OPENED,
      payload: { view: view.value, pageId },
    });
    dc.sendProductLog(LOG_DOCUMENT_OPEN, 'view', view.value.absolutePath);
  });
};
// -------------------------------------------------------------------------- //

// --- open a page ---------------------------------------------------------- //
export const openPage = pageInfo => (dispatch, getState) => {
  readPageAndViews(pageInfo, (err, documents) => {
    const keepErrors = _.pipe(_.filter(_.has('error')), _.map('error'));
    const keepValues = _.pipe(_.filter(_.has('value')), _.map('value'));
    const { views, pages } = documents;

    const errors = _.compact([err, ...keepErrors(views), ...keepErrors(pages)]);
    if (!_.isEmpty(errors)) {
      dispatch(addGlobalError(errors));
    }
    if (documents.pages[0].error) {
      return;
    }
    const page = documents.pages[0].value;
    const firstTimebarId = getFirstTimebarId(getState());
    dispatch({
      type: types.WS_PAGE_OPENED,
      payload: {
        windowId: page.windowId,
        views: keepValues(views),
        page: _.set('timebarUuid', firstTimebarId, page),
      },
    });

    const path = page.absolutePath || page.path || page.oId;
    dc.sendProductLog(LOG_DOCUMENT_OPEN, 'page', path);
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
  readWorkspacePagesAndViews(workspaceInfo, (err, documents = {}) => {
    const keepErrors = _.pipe(_.filter(_.has('error')), _.map('error'));
    const keepValues = _.pipe(_.filter(_.has('value')), _.map('value'));
    const { views, pages } = documents;
    const errors = _.compact([err, ...keepErrors(views), ...keepErrors(pages)]);
    if (!_.isEmpty(errors)) {
      setImmediate(() => { // TODO : find why store is not synced at this point
        dispatch(addGlobalError(errors));
      });
    }
    if (err) {
      dispatch(isWorkspaceOpening(false));
      return cb(errors);
    }

    dispatch(closeWorkspace());
    const payload = {
      ...documents,
      views: keepValues(documents.views),
      pages: keepValues(documents.pages),
      timebars: documents.timebars.map(prepareTimebar(documents.timelines, getState())),
    };
    dispatch({ type: types.WS_WORKSPACE_OPENED, payload });
    dispatch(isWorkspaceOpening(false));

    logLoadedDocumentsCount(documents);
    dc.sendProductLog(LOG_DOCUMENT_OPEN, 'workspace', path);

    dispatch(updateWorkspacePath(dirname(path), basename(path)));
    return cb(null);
  });
};
// -------------------------------------------------------------------------- //

// --- save a page ---------------------------------------------------------- //
export const savePage = (pageId, path) => (dispatch, getState) => {
  writePage(getState(), pageId, path, (err, oid) => {
    if (err) {
      dispatch(addMessage(pageId, 'danger', err));
      return;
    }
    if (oid) {
      dispatch(setPageOid(pageId, oid));
    }
    dispatch(updatePagePath(pageId, path));
    dispatch(updatePageAbsolutePath(pageId, path));
    dispatch(setPageModified(pageId, false));
    dispatch(addMessage('global', 'success', 'Page saved'));
  });
};
// -------------------------------------------------------------------------- //

// --- save a view ---------------------------------------------------------- //
export const saveView = (viewId, path, cb = _.noop) => (dispatch, getState) => {
  const view = getViewWithConfiguration(getState(), { viewId });
  writeView(view, path, (err, oid) => {
    if (err) {
      dispatch(addMessage(viewId, 'danger', err));
      cb(err);
      return;
    }
    if (oid) {
      dispatch(setViewOid(viewId, oid));
    }
    dispatch(updateViewPath(viewId, path));
    dispatch(updateViewAbsolutePath(viewId, path));
    dispatch(setViewModified(viewId, false));
    dispatch(addMessage(viewId, 'success', 'View saved'));
    cb(null, 'saved');
  });
};
// -------------------------------------------------------------------------- //

// --- save a workspace ----------------------------------------------------------//
export const saveWorkspace = path => (dispatch, getState) => {
  writeWorkspace(getState(), path, (err) => {
    if (err) {
      dispatch(addMessage('global', 'danger', err));
      return;
    }
    dispatch(updateWorkspacePath(dirname(path), basename(path)));
    dispatch(setWorkspaceModified(false));
    dispatch(addMessage('global', 'success', 'Workspace saved'));
  });
};
// -------------------------------------------------------------------------------//
