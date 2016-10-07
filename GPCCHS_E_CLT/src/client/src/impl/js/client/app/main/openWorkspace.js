import _ from 'lodash';

import debug from '../utils/mainDebug';
import readWorkspace from '../documents/workspace';
import { add as addTimeline } from '../store/mutations/timelineActions';
import { add as addTimebar } from '../store/mutations/timebarActions';
import { add as addConnectedData } from '../store/mutations/connectedDataActions';
import { add as addView } from '../store/mutations/viewActions';
import { add as addPage } from '../store/mutations/pageActions';
import { add as addWindow } from '../store/mutations/windowActions';

const logger = debug('main:loadWorkspace');

function loadInStore(workspace, dispatch) {
  // add timelines
  _.each(workspace.timelines, e => dispatch(addTimeline(e.uuid, e)));

  // add timebars
  _.each(workspace.timebars, e => dispatch(addTimebar(e.uuid, e)));

  // add connectedData
  _.each(workspace.connectedData, e => dispatch(addConnectedData(
    e.uuid,
    e.formula,
    e.domain,
    e.timeline,
    e.filter
  )));

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
