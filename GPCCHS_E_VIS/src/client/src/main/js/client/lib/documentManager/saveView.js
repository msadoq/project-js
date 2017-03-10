import { dirname } from 'path';
import _omit from 'lodash/fp/omit';
import _isArray from 'lodash/fp/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import { LOG_DOCUMENT_SAVE } from 'common/constants';

import { server } from '../mainProcess/ipc';
import validation from './validation';
import { createFolder } from '../common/fs';
import { writeDocument } from './io';
import { isViewTypeSupported, getSchema, getViewModule } from '../viewManager';
import fmdApi from '../common/fmd';

/**
 * Save view from state to file
 *
 * @param fmdApi
 */
const saveViewAs = (viewConfiguration, viewType, path, callback) => {
  if (!viewConfiguration) {
    callback(new Error('Empty view configuration'));
    return;
  }
  createFolder(dirname(path), (err) => {
    if (err) {
      callback(err);
      return;
    }
    if (!isViewTypeSupported(viewType)) {
      callback(new Error(`Invalid view type '${viewType}'`), viewConfiguration);
      return;
    }

    const configurationToSave = _cloneDeep(viewConfiguration);

    // Remove entry point id
    if (_isArray(configurationToSave.entryPoints)) {
      configurationToSave.entryPoints = configurationToSave.entryPoints.map(_omit('id'));
    }

    const configuration = getViewModule(viewType)
      .prepareConfigurationForFile(
        _cloneDeep(configurationToSave)
      );

    const schema = getSchema(viewType);
    const validationError = validation(viewType, configuration, schema);
    if (validationError) {
      callback(validationError);
      return;
    }

    writeDocument(fmdApi)(path, configuration, (errWrite, oId) => {
      if (errWrite) {
        callback(errWrite);
        return;
      }
      server.sendProductLog(LOG_DOCUMENT_SAVE, 'view', path);
      callback(null, oId);
    });
  });
};

/**
 * Save view from state to file
 *
 * @param fmdApi
 */
const saveView = (state, viewId, callback) => {
  if (!state.views[viewId]) {
    callback(new Error('Unknown view id'));
    return;
  }
  const absPath = state.views[viewId].absolutePath ? state.views[viewId].absolutePath
                                                   : state.views[viewId].oId;
  if (!absPath) {
    callback(new Error('Unknown path for saving text view'));
    return;
  }

  saveViewAs(
    state.views[viewId].configuration, state.views[viewId].type, absPath, callback
  );
};

export default {
  saveViewAs,
  saveView,
};
