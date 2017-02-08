import identity from 'lodash/fp/identity';
import compose from 'lodash/fp/compose';
import update from 'lodash/fp/update';
import map from 'lodash/fp/map';
import constant from 'lodash/fp/constant';
import { dirname } from 'path';
import { getStore } from '../../../store/mainStore';
import { getView } from '../../../store/selectors/views';
import { add } from '../../../store/actions/messages';
import { getPathByFilePicker } from '../../dialog';
import { saveViewAs } from '../../../common/documentManager';
import vivl from '../../../../VIVL/main';
import { getRootDir } from '../../../common/fmd';

const root = getRootDir();

const clearFormula = (structureType) => {
  const clear = key => update(key, constant(''));
  if (structureType === 'last') {
    return clear('connectedData.formula');
  } else if (structureType === 'range') {
    return compose(clear('connectedDataX.formula'), clear('connectedDataY.formula'));
  }
  return identity;
};

export default function ({ viewId }) {
  const { getState, dispatch } = getStore();
  const { type, configuration, absolutePath } = getView(getState(), viewId);

  const structureType = vivl(type, 'structureType')();
  const clearEntrypointsFormulas = update('entryPoints', map(clearFormula(structureType)));
  const modelConfig = clearEntrypointsFormulas(configuration);

  const folder = absolutePath ? dirname(absolutePath) : root;
  return getPathByFilePicker(folder, 'model', 'save', (err, path) => {
    saveViewAs(modelConfig, type, path, (errSaving) => {
      if (errSaving) {
        dispatch(add(viewId, 'danger', `Model unsaved ${errSaving}`));
      } else {
        dispatch(add(viewId, 'success', 'Model saved'));
      }
    });
  });
}
