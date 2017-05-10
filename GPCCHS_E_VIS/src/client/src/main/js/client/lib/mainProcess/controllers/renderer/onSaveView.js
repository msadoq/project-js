import { dirname } from 'path';
import { getStore } from '../../../store/mainStore';
import { setModified, updatePath, updateAbsolutePath, setViewOid } from '../../../store/actions/views';
import { addOnce as addMessage } from '../../../store/actions/messages';
import { getPathByFilePicker } from '../../dialog';
import { saveViewAs } from '../../../documentManager';

import { getViewWithConfiguration } from '../../../viewManager';
import { getRootDir, isInFmd, getRelativeFmdPath } from '../../../common/fmd';

const getPath = path => (isInFmd(path) ? getRelativeFmdPath(path) : path);

const root = getRootDir();
const addViewError = (viewId, msg) => addMessage(viewId, 'danger', msg);

export default function ({ viewId, saveAs }) {
  const { getState, dispatch } = getStore();
  const view = getViewWithConfiguration(getState(), { viewId });
  const { absolutePath, isModified } = view;

  function oncePath(savingAbsolutePath) {
    if (!isModified && absolutePath === savingAbsolutePath) {
      return dispatch(addMessage(viewId, 'info', 'View already saved'));
    }
    return saveViewAs(view, savingAbsolutePath, (err, oid) => {
      if (err) {
        return dispatch(addViewError(viewId, err));
      }
      if (absolutePath !== savingAbsolutePath) {
        // only for 'Save as...' action
        dispatch(updatePath(viewId, getPath(savingAbsolutePath)));
        dispatch(updateAbsolutePath(viewId, savingAbsolutePath));
        if (oid) {
          dispatch(setViewOid(viewId, oid));
        }
      }

      dispatch(setModified(viewId, false));
      return dispatch(addMessage(viewId, 'success', 'View saved'));
    });
  }

  if (!saveAs) {
    return oncePath(absolutePath);
  }

  const folder = absolutePath ? dirname(absolutePath) : root;
  return getPathByFilePicker(folder, 'view', 'save', (err, path) => oncePath(path));
}
