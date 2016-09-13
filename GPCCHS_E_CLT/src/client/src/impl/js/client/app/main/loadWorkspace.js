import debug from '../utils/debug';
import _ from 'lodash';
import { readWorkspace } from '../documents/workspace';
import { getStore } from '../store/mainStore';
// import { add as addEntryPoint } from '../store/mutations/entryPointActions';
import { add as addView } from '../store/mutations/viewActions';
import { add as addPage } from '../store/mutations/pageActions';
import { add as addWindow } from '../store/mutations/windowActions';

const logger = debug('main:loadWorkspace');

export default function loadWorkspace(path, callback) {
  // TODO : read file path in params => file picker
  readWorkspace(path, (err, workspace) => {
    if (err) {
      return callback(err);
    }

    console.log(workspace);

    // TODO : handle empty payload => file picker

    // TODO : duplicate window/page/view on ws reconnect (uuid is done on server side on each connect)!

    const dispatch = getStore().dispatch;

    // connectedData
    console.log(workspace.connectedData)
    // TODO add entry points

    // add views
    _.each(workspace.views, e => dispatch(addView(e.uuid, e.type, e.configuration, [])));

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
    // console.log(getStore().getState())
    return callback(null);
  });
}
