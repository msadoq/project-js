import _ from 'lodash';

import readWorkspace from './documents/workspace';
import { getStore } from '../store/mainStore';
import { add as addTimeline } from '../store/actions/timelines';
import { add as addTimebar } from '../store/actions/timebars';
import { add as addView } from '../store/actions/views';
import { add as addPage } from '../store/actions/pages';
import { add as addWindow } from '../store/actions/windows';

function loadInStore(workspace, dispatch) {
  // add timelines
  _.each(workspace.timelines, e => dispatch(addTimeline(e.uuid, e)));

  // add timebars
  _.each(workspace.timebars, e => dispatch(addTimebar(e.uuid, e)));

  // add views
  _.each(workspace.views, e => dispatch(addView(e.uuid, e.type, e.configuration)));

  // add pages
  _.each(workspace.pages, e => dispatch(addPage(
    e.uuid,
    e.timebarId,
    e.title,
    _.map(e.views, v => v.uuid),
    _.map(e.views, v => ({
      i: v.uuid,
      x: v.geometry.x,
      y: v.geometry.y,
      w: v.geometry.w,
      h: v.geometry.h,
    })),
  )));

  // add windows
  _.each(workspace.windows,
    (e) => {
      // set focusedPage on the fly (not in documents)
      let pageId = null;
      if (e.pages && e.pages.length) {
        pageId = e.pages[0];
      }
      dispatch(addWindow(e.uuid, e.title, e.geometry, e.pages, pageId));
    }
  );
}

/**
 * Open 'file' relative to 'root' folder, 'dispatch' corresponding actions and call 'callback'
 *
 * @param root
 * @param file
 * @param dispatch
 * @param callback
 */
export default function openWorkspace(root, file, dispatch, callback) {
  readWorkspace(root, file, (err, workspace) => {
    if (err) {
      return callback(err);
    }

    loadInStore(workspace, dispatch);

    return callback(null);
  });
}
