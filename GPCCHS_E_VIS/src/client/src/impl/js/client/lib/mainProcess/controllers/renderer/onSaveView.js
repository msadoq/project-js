import { dirname } from 'path';
import { getStore } from '../../../store/mainStore';
import { getView } from '../../../store/selectors/views';
import { setModified, updatePath, updateAbsolutePath, setViewOid } from '../../../store/actions/views';
import { addOnce as addMessage } from '../../../store/actions/messages';
import { getPathByFilePicker } from '../../dialog';
import { saveViewAs } from '../../../common/documentManager';

import { getRootDir, isFmd, getRelativeFmdPath } from '../../../common/fmd';

const getPath = path => (isFmd(path) ? getRelativeFmdPath(path) : path);

const root = getRootDir();
const addViewError = (viewId, msg) => addMessage(viewId, 'danger', msg);

export default function ({ viewId, saveAs }) {
  const { getState, dispatch } = getStore();
  const { type, configuration, absolutePath } = getView(getState(), viewId);

  function oncePath(savingAbsolutePath) {
    saveViewAs(configuration, type, savingAbsolutePath, (err, oid) => {
      if (err) {
        return getStore().dispatch(addViewError(viewId, err));
      }
      if (saveAs !== savingAbsolutePath) {
        // only for 'Save as...' action
        dispatch(updatePath(viewId, getPath(savingAbsolutePath)));
        dispatch(updateAbsolutePath(viewId, savingAbsolutePath));
        if (oid) {
          dispatch(setViewOid(viewId, oid));
        }
      }

      dispatch(setModified(viewId, false));
      dispatch(addMessage(viewId, 'success', 'View saved'));
    });
  }

  if (saveAs) {
    return oncePath(saveAs);
  }

  const folder = absolutePath ? dirname(absolutePath) : root;
  return getPathByFilePicker(folder, 'view', 'save', (err, path) => oncePath(path));
}
