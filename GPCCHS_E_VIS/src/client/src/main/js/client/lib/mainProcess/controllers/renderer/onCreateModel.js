import { dirname } from 'path';
import { getStore } from '../../../store/mainStore';
import { getView } from '../../../store/selectors/views';
import { add } from '../../../store/actions/messages';
import { getPathByFilePicker } from '../../dialog';
import { saveViewAs } from '../../../documentManager';
import { getRootDir } from '../../../common/fmd';
import { getViewModule } from '../../../viewManager';

const root = getRootDir();

export default function ({ viewId }) {
  const { getState, dispatch } = getStore();
  const { type, configuration, absolutePath } = getView(getState(), { viewId });

  const folder = absolutePath ? dirname(absolutePath) : root;
  const modelConfiguration = getViewModule(type).prepareConfigurationForModel(configuration);
  return getPathByFilePicker(folder, 'model', 'save', (err, path) => {
    saveViewAs(modelConfiguration, type, path, (errSaving) => {
      if (errSaving) {
        dispatch(add(viewId, 'danger', `Model unsaved ${errSaving}`));
      } else {
        dispatch(add(viewId, 'success', 'Model saved'));
      }
    });
  });
}
