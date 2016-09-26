import debug from '../utils/debug';
import _ from 'lodash';
import { getStore } from '../store/mainStore';
import { add as addTimeline } from '../store/mutations/timelineActions';
import { add as addTimebar } from '../store/mutations/timebarActions';
import { add as addConnectedData } from '../store/mutations/connectedDataActions';
import { add as addView } from '../store/mutations/viewActions';
import { add as addPage } from '../store/mutations/pageActions';
import { add as addWindow } from '../store/mutations/windowActions';

const logger = debug('main:loadWorkspace');

// TODO : read file path in params => file picker
// TODO : handle error in workspace reading => file picker

export default function loadWorkspace(workspace) {
  const dispatch = getStore().dispatch;

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
    e => dispatch(addWindow(e.uuid, e.title, e.geometry, e.pages))
  );

  const state = getStore().getState();
  const count = {
    w: Object.keys(state.windows).length,
    p: Object.keys(state.pages).length,
    v: Object.keys(state.views).length,
  };
  logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);
}
