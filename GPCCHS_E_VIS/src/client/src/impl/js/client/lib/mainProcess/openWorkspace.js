import _each from 'lodash/each';
import _map from 'lodash/map';
import path from 'path';
import { dialog } from 'electron';
import { v4 } from 'node-uuid';


import debug from '../common/debug/mainDebug';
import parameters from '../common/parameters';
import readWorkspace from '../documentsManager/workspace';
import { add as addTimeline } from '../store/actions/timelines';
import { add as addTimebar } from '../store/actions/timebars';
import { add as addView } from '../store/actions/views';
import { add as addPage, setModified as setModifiedPage } from '../store/actions/pages';
import { add as addWindow, setModified as setModifiedWindow } from '../store/actions/windows';
import { updatePath } from '../store/actions/hsc';

import { getPathByFilePicker } from './filePicker';

const logger = debug('mainProcess:openWorkspace');

export function loadInStore(workspace, dispatch, root, file, callback) {
  // add timelines
  _each(workspace.timelines, e => dispatch(addTimeline(e.uuid, e)));

  // add timebars
  _each(workspace.timebars, e => dispatch(addTimebar(e.uuid, e)));

  // add views
  _each(workspace.views, e => dispatch(addView(
    e.uuid,
    e.type,
    e.configuration,
    e.path,
    e.oId,
    e.absolutePath,
    false,
  )));

  // add pages
  _each(workspace.pages, (e) => {
    dispatch(addPage(
      e.uuid,
      e.timebarId,
      e.title,
      _map(e.views, v => v.uuid),
      _map(e.views, v => ({
        i: v.uuid,
        x: v.geometry.x,
        y: v.geometry.y,
        w: v.geometry.w,
        h: v.geometry.h,
      })),
      e.path,
      e.oId,
      e.absolutePath,
      false,
    ));
  });

  // add windows
  _each(workspace.windows,
    (e) => {
      // set focusedPage on the fly (not in documents)
      let pageId = null;
      if (e.pages && e.pages.length) {
        pageId = e.pages[0];
      }
      dispatch(addWindow(e.uuid, e.title, e.geometry, e.pages, pageId, false));
    }
  );

  // workspace path
  dispatch(updatePath(root, file));


  if (typeof callback === 'function') {
    return callback(null);
  }
}

/**
 * Open 'file' relative to 'root' folder, 'dispatch' corresponding actions and call 'callback'
 *
 * @param dispatch
 * @param getState
 */
export default function openWorkspace(dispatch, getState, callback) {
  const root = parameters.FMD_ROOT;
  if (parameters.OPEN) {
    const file = parameters.OPEN;
    readWkFile(dispatch, getState, root, file, callback);
  } else {
    openDefaultWorkspace(dispatch, root, callback);
  }
}

export function readWkFile(dispatch, getState, root, file, callback) {
  // we receive a file to open from the command line
  readWorkspace(root, file, (err, workspace) => {
    if (err) {
      logger.error(err);
      dialog.showErrorBox('ERROR', err);
      const filePath = getPathByFilePicker(root, 'workspace');
      if (filePath) {
        readWkFile(dispatch, getState, path.dirname(filePath), path.basename(filePath));
        return;
      }
      openDefaultWorkspace(dispatch, root);
      return;
    }
    loadInStore(workspace, dispatch, root, file, callback);

    const state = getState();
    const count = {
      w: Object.keys(state.windows).length,
      p: Object.keys(state.pages).length,
      v: Object.keys(state.views).length,
    };
    logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);
  });
}

export function openDefaultWorkspace(dispatch, root, callback) {
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
    }
  };
  const timebar = {
    type: 'timeBarConfiguration',
    id: 'TB1',
    mode: 'Normal',
    visuWindow: {
      lower: Date.now() - (5 * 60 * 1000),
      upper: Date.now() + (5 * 60 * 1000),
      current: Date.now()
    },
    slideWindow: {
      lower: Date.now() - (5 * 60 * 1000),
      upper: Date.now() + (5 * 60 * 1000),
    },
    extUpperBound: Date.now() - (5 * 60 * 1000),
    rulerStart: Date.now() - (10 * 60 * 1000),
    rulerResolution: 11250,
    speed: 1.0,
    playingState: 'pause',
    offsetFromUTC: 0,
    timelines: [],
  };
  const page = { type: 'Page',
    title: 'Unknown',
    hideBorders: false,
    timebarId: tbUuid,
    timeBarId: 'TB1',
  };
  const workspace = {
    windows: { [wsUuid]: Object.assign(window, { uuid: wsUuid }) },
    timebars: { [tbUuid]: Object.assign(timebar, { uuid: tbUuid }) },
    pages: { [pgUuid]: Object.assign(page, { uuid: pgUuid }) },
  };
  loadInStore(workspace, dispatch, root, undefined, callback);
}
