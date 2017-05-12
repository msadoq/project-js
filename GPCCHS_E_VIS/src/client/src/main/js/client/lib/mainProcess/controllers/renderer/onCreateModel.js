import { dirname } from 'path';
import { getStore } from '../../../store/mainStore';
import { add } from '../../../store/actions/messages';
import { getPathByFilePicker } from '../../dialog';
import { saveViewAs } from '../../../documentManager';
import { getRootDir } from '../../../common/fmd';
import { getViewModule, getViewWithConfiguration } from '../../../viewManager';

export default function ({ viewId }) {
  const root = getRootDir();
  const { getState, dispatch } = getStore();
  const view = getViewWithConfiguration(getState(), { viewId });
  const { type, absolutePath } = view;

  const folder = absolutePath ? dirname(absolutePath) : root;
  const viewToSave = getViewModule(type).prepareViewForModel(view);
  return getPathByFilePicker(folder, 'model', 'save', (err, path) => {
    saveViewAs(viewToSave, path, (errSaving) => {
      if (errSaving) {
        dispatch(add(viewId, 'danger', `Model unsaved ${errSaving}`));
      } else {
        dispatch(add(viewId, 'success', 'Model saved'));
      }
    });
  });
}
