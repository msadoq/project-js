import _ from 'lodash/fp';
import { dirname } from 'path';
import { getStore } from '../../../store/mainStore';
import { getView } from '../../../store/reducers/views';
import { setModified, updatePath, updateAbsolutePath, setViewOid } from '../../../store/actions/views';
import { addOnce as addMessage } from '../../../store/actions/messages';
import { getPathByFilePicker } from '../../dialog';
import { saveViewAs } from '../../../documentManager';

import { getRootDir, isInFmd, getRelativeFmdPath } from '../../../common/fmd';

const getPath = path => (isInFmd(path) ? getRelativeFmdPath(path) : path);

const root = getRootDir();
const addViewError = (viewId, msg) => addMessage(viewId, 'danger', msg);

const pickViewProperties = _.pick([
  'type',
  'title',
  'titleStyle',
  'backgroundColor',
  'links',
  'defaultRatio',
  'procedures',
]);

export default function ({ viewId, saveMode }) {
  const { getState, dispatch } = getStore();
  const view = getView(getState(), { viewId });
  const {
    type,
    configuration,
    absolutePath,
    isModified,
  } = view;

  function oncePath(savingAbsolutePath) {
    if (!isModified && saveMode === savingAbsolutePath) {
      return getStore().dispatch(addMessage(viewId, 'info', 'View already saved'));
    }
    // TODO garm refacto saveView
    const allViewConf = _.merge(pickViewProperties(view), configuration);
    return saveViewAs(allViewConf, type, savingAbsolutePath, (err, oid) => {
      if (err) {
        return getStore().dispatch(addViewError(viewId, err));
      }
      if (saveMode !== savingAbsolutePath) {
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

  if (saveMode) {
    return oncePath(saveMode);
  }

  const folder = absolutePath ? dirname(absolutePath) : root;
  return getPathByFilePicker(folder, 'view', 'save', (err, path) => oncePath(path));
}
