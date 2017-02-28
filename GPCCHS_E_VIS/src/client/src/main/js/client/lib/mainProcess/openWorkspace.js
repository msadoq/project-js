import _each from 'lodash/each';
import _map from 'lodash/map';
import { v4 } from 'uuid';
import getLogger from 'common/log';
import { LOG_DOCUMENT_OPEN } from 'common/constants';

import { server } from './ipc';
import { readWorkspace } from '../common/documentManager';
import { add as addTimeline } from '../store/actions/timelines';
import { add as addTimebar } from '../store/actions/timebars';
import { add as addView } from '../store/actions/views';
import { add as addPage } from '../store/actions/pages';
import { add as addWindow } from '../store/actions/windows';
import { updatePath, setWorkspaceAsOpened, closeWorkspace } from '../store/actions/hsc';

import loadDocumentsInStore from '../documentManager/loadDocumentsInStore';


const logger = getLogger('main:openWorkspace');

export function loadInStore(workspace, dispatch, root, file, callback, isDefault = false) {
  // add windows
  _each(workspace.windows,
    (e) => {
      // set focusedPage on the fly (not in documents)
      let pageId = null;
      if (e.pages && e.pages.length) {
        pageId = e.pages[0];
      }
      dispatch(addWindow(e.uuid, e.title, e.geometry, e.pages, pageId, isDefault));
    }
  );

  // add timelines
  _each(workspace.timelines, e => dispatch(addTimeline(e.uuid, e)));

  // add timebars
  _each(workspace.timebars, e => dispatch(addTimebar(e.uuid, e)));

  // add pages
  _each(workspace.pages, (e) => {
    dispatch(addPage(
      e.uuid,
      e.timebarUuid,
      e.title,
      _map(e.views, v => v.uuid),
      _map(e.views, v => ({
        i: v.uuid,
        x: v.geometry.x,
        y: v.geometry.y,
        w: v.geometry.w,
        h: v.geometry.h,
        maxH: v.geometry.maxH || 100,
        maxW: v.geometry.maxW || 100,
      })),
      e.path,
      e.oId,
      e.absolutePath,
      false,
      e.properties,
      e.timebarHeight,
      e.timebarCollapsed
    ));
  });

  // add views
  _each(workspace.views, (e) => {
    dispatch(addView(
      e.uuid,
      e.type,
      e.configuration,
      e.path,
      e.oId,
      e.absolutePath,
      isDefault
    ));
  });

  // workspace path
  dispatch(updatePath(root, file));
  dispatch(setWorkspaceAsOpened());

  return (typeof callback === 'function') ? callback(null) : undefined;
}

export function openWorkspaceDocument(dispatch, getState, root, file, callback) {
  // we receive a file to open from the command line
  readWorkspace(root, file, (err, workspace) => {
    if (err) {
      logger.error(err);
      if (typeof callback === 'function') {
        return callback(err);
      }
      return err;
    }
    // close old workspace
    dispatch(closeWorkspace());
    loadInStore(workspace, dispatch, root, file);

    const state = getState();
    const count = {
      w: Object.keys(state.windows).length,
      p: Object.keys(state.pages).length,
      v: Object.keys(state.views).length,
    };
    logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);
    server.sendProductLog(LOG_DOCUMENT_OPEN, 'workspace', file);

    return (typeof callback === 'function') ? callback(null) : undefined;
  });
}

const createBlankWorkspace = () => {
  const wsUuid = v4();
  const tbUuid = v4();
  const pgUuid = v4();
  const window = {
    title: 'Unknown',
    type: 'documentWindow',
    focusedPage: pgUuid,
    pages: [pgUuid],
    geometry: {
      w: 1200,
      h: 900,
      x: 10,
      y: 10,
    },
  };
  const timebar = {
    type: 'timeBarConfiguration',
    id: 'TB1',
    mode: 'Normal',
    visuWindow: {
      lower: Date.now() - (5 * 60 * 1000),
      upper: Date.now() + (5 * 60 * 1000),
      current: Date.now(),
    },
    slideWindow: {
      lower: Date.now() - (5 * 60 * 1000),
      upper: Date.now() + (5 * 60 * 1000),
    },
    extUpperBound: Date.now() - (5 * 60 * 1000),
    rulerStart: Date.now() - (10 * 60 * 1000),
    rulerResolution: 11250,
    speed: 1.0,
    offsetFromUTC: 0,
    timelines: [],
  };
  const page = { type: 'Page',
    title: 'Unknown',
    hideBorders: false,
    timebarUuid: tbUuid,
    timebarId: 'TB1',
  };
  const workspace = {
    windows: [Object.assign(window, { uuid: wsUuid })],
    timebars: [Object.assign(timebar, { uuid: tbUuid })],
    pages: [Object.assign(page, { uuid: pgUuid })],
  };
  return workspace;
};

export const openDefaultWorkspace = () => (dispatch) => {
  server.sendProductLog(LOG_DOCUMENT_OPEN, 'workspace', 'new workspace');
  dispatch(loadDocumentsInStore(createBlankWorkspace()));
};
