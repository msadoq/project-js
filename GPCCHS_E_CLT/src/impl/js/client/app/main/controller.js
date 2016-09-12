import debug from '../utils/debug';
import _ from 'lodash';
import { getStore } from '../store/mainStore';
// import { add as addEntryPoint } from '../store/mutations/entryPointActions';
import { add as addView } from '../store/mutations/viewActions';
import { add as addPage } from '../store/mutations/pageActions';
import { add as addWindow } from '../store/mutations/windowActions';

const logger = debug('main:controller');

export default function controller(event, payload) {
  switch (event) {
    case 'open': {
      // TODO : handle empty payload => file picker

      // TODO : duplicate window/page/view on ws reconnect (uuid is done on server side on each connect)!

      const dispatch = getStore().dispatch;

      // TODO add entry points

      // add views
      _.each(payload.views, e => dispatch(addView(e.uuid, e.type, e.configuration, [])));

      // add pages
      _.each(payload.pages, e => dispatch(addPage(
        e.uuid,
        e.path || e.oId,
        _.map(e.views, v => v.uuid),
        _.map(e.views, v => Object.assign({ viewId: v.uuid }, v.geometry)),
      )));

      // add windows
      _.each(payload.windows,
        e => dispatch(addWindow(e.uuid, 'TODO DOC', e.geometry, e.pages))
      );

      const state = getStore().getState();
      const count = {
        w: Object.keys(state.windows).length,
        p: Object.keys(state.pages).length,
        v: Object.keys(state.views).length,
      };
      logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);
      break;
    }
    default:
      logger.error('Received not yet implemented event', event);
  }
}
