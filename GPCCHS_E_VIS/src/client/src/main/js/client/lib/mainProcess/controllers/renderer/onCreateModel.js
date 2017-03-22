import _ from 'lodash/fp';
import { dirname } from 'path';
import { getStore } from '../../../store/mainStore';
import { getView } from '../../../store/reducers/views';
import { add } from '../../../store/actions/messages';
import { getPathByFilePicker } from '../../dialog';
import { saveViewAs } from '../../../documentManager';
import { getRootDir } from '../../../common/fmd';
import { getViewModule } from '../../../viewManager';

const root = getRootDir();

const pickViewProperties = _.pick([
  'type',
  'title',
  'titleStyle',
  'backgroundColor',
  'links',
  'defaultRatio',
  'procedures',
]);

export default function ({ viewId }) {
  const { getState, dispatch } = getStore();
  const view = getView(getState(), { viewId });
  const { type, configuration, absolutePath } = view;

  const folder = absolutePath ? dirname(absolutePath) : root;
  const modelConfiguration = getViewModule(type).prepareConfigurationForModel(configuration);
  const viewToSave = _.merge(pickViewProperties(view), modelConfiguration);
  return getPathByFilePicker(folder, 'model', 'save', (err, path) => {
    saveViewAs(viewToSave, type, path, (errSaving) => {
      if (errSaving) {
        dispatch(add(viewId, 'danger', `Model unsaved ${errSaving}`));
      } else {
        dispatch(add(viewId, 'success', 'Model saved'));
      }
    });
  });
}
