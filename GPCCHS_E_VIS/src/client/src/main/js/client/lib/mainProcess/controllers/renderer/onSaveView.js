import { dirname } from 'path';
import reply from '../../../common/ipc/reply';
import { getStore } from '../../store';
import {
  setModified,
  updatePath,
  updateAbsolutePath,
  setViewOid,
} from '../../../store/actions/views';
import { add as addMessage } from '../../../store/actions/messages';
import { getPathByFilePicker } from '../../dialog';
import { saveViewAs } from '../../../documentManager';

import { getViewWithConfiguration } from '../../../viewManager';
import { getRootDir, isInFmd, getRelativeFmdPath } from '../../../common/fmd';

const getPath = path => (isInFmd(path) ? getRelativeFmdPath(path) : path);

const root = getRootDir();
const addViewError = (viewId, msg) => addMessage(viewId, 'danger', msg);

export default function (queryId, { viewId, saveAs }) {
  const { getState, dispatch } = getStore();
  const view = getViewWithConfiguration(getState(), { viewId });
  const { absolutePath, isModified } = view;

  function oncePath(savingAbsolutePath) {
    if (!isModified && absolutePath === savingAbsolutePath) {
      dispatch(addMessage(viewId, 'info', 'View already saved'));
    }
    saveViewAs(view, savingAbsolutePath, (err, oid) => {
      if (err) {
        dispatch(addViewError(viewId, err));
        if (queryId) {
          reply(queryId, err);
        }
        return;
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
      dispatch(addMessage(viewId, 'success', 'View saved'));
      if (queryId) {
        reply(queryId, null);
      }
    });
  }

  if (!saveAs) {
    oncePath(absolutePath);
    return;
  }

  const folder = absolutePath ? dirname(absolutePath) : root;
  getPathByFilePicker(folder, 'view', 'save', (err, path) => {
    oncePath(path);
  });
}
