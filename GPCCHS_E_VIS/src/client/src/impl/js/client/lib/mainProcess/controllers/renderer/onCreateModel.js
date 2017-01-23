import _cloneDeep from 'lodash/cloneDeep';
import { dirname } from 'path';
import { getStore } from '../../../store/mainStore';
import { getView } from '../../../store/selectors/views';
import { add } from '../../../store/actions/messages';
import { getPathByFilePicker } from '../../dialog';
import { saveViewAs } from '../../../common/documentManager';
import vivl from '../../../../VIVL/main';
import { getRootDir } from '../../../common/fmd';


const root = getRootDir();

export default function ({ viewId }) {
  const { getState, dispatch } = getStore();
  const { type, configuration, absolutePath } = getView(getState(), viewId);

  const folder = absolutePath ? dirname(absolutePath) : root;
  return getPathByFilePicker(folder, 'model', 'save', (err, path) => {
    if (path) {
      // Create a twin view without formula in entry Points
      const modelConfig = _cloneDeep(configuration);
      const structureType = vivl(type, 'structureType')();
      if (structureType === 'last') {
        modelConfig.entryPoints.forEach((ep) => {
          ep.connectedData.formula = ''; // eslint-disable-line no-param-reassign
        });
      } else if (structureType === 'range') {
        modelConfig.entryPoints.forEach((ep) => {
          ep.connectedDataX.formula = ''; // eslint-disable-line no-param-reassign
          ep.connectedDataY.formula = ''; // eslint-disable-line no-param-reassign
        });
      }

      saveViewAs(modelConfig, type, path, (errSaving) => {
        if (errSaving) {
          dispatch(add(viewId, 'danger', `Model unsaved ${errSaving}`));
        } else {
          dispatch(add(viewId, 'success', 'Model saved'));
        }
      });
    }
  });
}
