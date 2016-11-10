import { each, map } from 'lodash';

import debug from '../common/debug/mainDebug';
import parameters from '../common/parameters';
import readWorkspace from './documents/workspace';
import { add as addTimeline } from '../store/actions/timelines';
import { add as addTimebar } from '../store/actions/timebars';
import { add as addView } from '../store/actions/views';
import { add as addPage } from '../store/actions/pages';
import { add as addWindow } from '../store/actions/windows';
import { updatePath } from '../store/actions/workspace';
import { onWorkspaceLoaded } from './lifecycle';

const logger = debug('mainProcess:index');

function loadInStore(workspace, dispatch, root, file) {
  // add timelines
  each(workspace.timelines, e => dispatch(addTimeline(e.uuid, e)));

  // add timebars
  each(workspace.timebars, e => dispatch(addTimebar(e.uuid, e)));

  // add views
  each(workspace.views, e => dispatch(addView(e.uuid, e.type, e.configuration, e.path, e.oId)));

  // add pages
  each(workspace.pages, e => dispatch(addPage(
    e.uuid,
    e.timebarId,
    e.title,
    map(e.views, v => v.uuid),
    map(e.views, v => ({
      i: v.uuid,
      x: v.geometry.x,
      y: v.geometry.y,
      w: v.geometry.w,
      h: v.geometry.h,
    })),
    e.path,
    e.oId,
  )));

  // add windows
  each(workspace.windows,
    (e) => {
      // set focusedPage on the fly (not in documents)
      let pageId = null;
      if (e.pages && e.pages.length) {
        pageId = e.pages[0];
      }
      dispatch(addWindow(e.uuid, e.title, e.geometry, e.pages, pageId));
    }
  );

  // workspace path
  dispatch(updatePath(root, file));

  // workspace is loaded
  onWorkspaceLoaded(dispatch);
}

/**
 * Open 'file' relative to 'root' folder, 'dispatch' corresponding actions and call 'callback'
 *
 * @param dispatch
 * @param getState
 */
export default function openWorkspace(dispatch, getState) {
  if (parameters.OPEN) {
    const root = parameters.FMD_ROOT;
    const file = parameters.OPEN;
    // we receive a file to open from the command line
    readWorkspace(root, file, (err, workspace) => {
      if (err) {
        logger.error(err);
        // TODO : file picker
        return console.error('TODO filepicker');
      }
      loadInStore(workspace, dispatch, root, file);

      const state = getState();
      const count = {
        w: Object.keys(state.windows).length,
        p: Object.keys(state.pages).length,
        v: Object.keys(state.views).length,
      };
      logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);
    });
  } else {
    // open the file picker
    // TODO : file picker
    return console.error('TODO filepicker');
  }
}
