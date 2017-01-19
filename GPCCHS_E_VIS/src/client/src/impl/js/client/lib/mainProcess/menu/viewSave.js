import {
  setModified as setModifiedView,
  updateAbsolutePath as updateAbsViewPath,
} from '../../store/actions/views';
import { saveView } from '../../documentManager/saveView';
import { getStore } from '../../store/mainStore';
import { getPathByFilePicker } from '../dialog';

module.exports = { saveOneView };

function saveOneView(viewId, as = false) {
  const state = getStore().getState();
  if (!as && (state[viewId].oId || state[viewId].path || state[viewId].absolutePath)) {
    saveView(state, viewId);
  } else {
    updateViewPath(viewId, getStore(), getStore().dispatch, (err, vId) => {
      if (err) {
        return;
      }
      saveView(getStore().getState(), vId, (errSave, id) => {
        if (errSave) {
          return;
        }
        getStore().dispatch(setModifiedView(id, false));
      });
    });
  }
}

function updateViewPath(viewId, store, dispatch, callback) {
  const state = store.getState();
  const view = state.views[viewId];
  getPathByFilePicker(state.hsc.folder, `View ${view.configuration.title}`, 'save',
    (err, newViewPath) => {
      if (err) {
        callback(err, null);
      }
      dispatch(updateAbsViewPath(viewId, newViewPath));
      callback(null, viewId);
    });
}
