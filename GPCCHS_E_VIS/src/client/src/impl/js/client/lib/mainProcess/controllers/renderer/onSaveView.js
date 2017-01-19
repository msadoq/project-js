import { dirname } from 'path';
import parameters from 'common/parameters';
import { getStore } from '../../../store/mainStore';
import { getView } from '../../../store/selectors/views';
import { setModified, updateAbsolutePath } from '../../../store/actions/views';
import { add } from '../../../store/actions/messages';
import { getPathByFilePicker } from '../../dialog';
import { saveViewAs } from '../../../common/documentManager';

const root = parameters.get('FMD_ROOT_DIR');

export default function ({ viewId, saveAs }) {
  const { getState, dispatch } = getStore();
  const { type, configuration, absolutePath } = getView(getState(), viewId);

  function oncePath(path) {
    // TODO: case of oid : check rights
    // TODO: check if file already exists
    saveViewAs(configuration, type, path, () => {
      if (!saveAs) {
        // only for 'Save as...' action
        dispatch(updateAbsolutePath(viewId, path));
      }

      dispatch(setModified(viewId, false));
      dispatch(add(viewId, 'success', 'View saved'));
    });
  }

  if (saveAs) {
    return oncePath(saveAs);
  }

  const folder = absolutePath ? dirname(absolutePath) : root;
  return getPathByFilePicker(folder, 'view', 'save', (err, path) => {
    if (path) {
      oncePath(path);
    }
  });
}
