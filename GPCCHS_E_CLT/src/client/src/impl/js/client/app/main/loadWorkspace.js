import debug from '../utils/debug';
import _ from 'lodash';
import { readWorkspace } from '../documents/workspace';
import { getStore } from '../store/mainStore';
import { add as addConnectedData } from '../store/mutations/connectedDataActions';
import { add as addView } from '../store/mutations/viewActions';
import { add as addPage } from '../store/mutations/pageActions';
import { add as addWindow } from '../store/mutations/windowActions';

const logger = debug('main:loadWorkspace');

// TODO : read file path in params => file picker
// TODO : handle error in workspace reading => file picker

export default function loadWorkspace(path, callback) {
  readWorkspace(path, (err, workspace) => {
    if (err) {
      return callback(err);
    }

    const dispatch = getStore().dispatch;

    // connectedData
    _.each(workspace.connectedData, e => dispatch(addConnectedData(
      e.uuid,
      e.formula,
      e.domain,
      e.timeLine, // TODO timeline => after Audrey key change
      e.filter
    )));

    // add views
    _.each(workspace.views, e => dispatch(addView(e.uuid, e.type, e.configuration)));

    // add pages
    _.each(workspace.pages, e => dispatch(addPage(
      e.uuid,
      e.path || e.oId,
      _.map(e.views, v => v.uuid),
      _.map(e.views, v => Object.assign({
        i: v.uuid,
        x: v.geometry.x,
        y: v.geometry.y,
        w: v.geometry.w,
        h: v.geometry.h,
      })),
    )));

    // add windows
    _.each(workspace.windows,
      e => dispatch(addWindow(e.uuid, 'TODO DOC', e.geometry, e.pages))
    );

    const state = getStore().getState();
    const count = {
      w: Object.keys(state.windows).length,
      p: Object.keys(state.pages).length,
      v: Object.keys(state.views).length,
    };
    logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);
    return callback(null);
  });
}
