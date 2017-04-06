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
      .prepareViewForFile(
        _cloneDeep(configurationToSave)
      );

    const schema = getSchema(viewType);
    const validationError = validation(viewType, configuration, schema);
    if (validationError) {
      callback(validationError);
      return;
    }

    writeDocument(path, configuration, (errWrite, oId) => {
      if (errWrite) {
        callback(errWrite);
        return;
      }
      server.sendProductLog(LOG_DOCUMENT_SAVE, 'view', path);
      callback(null, oId);
    });
  });
};

export default {
  saveViewAs,
};
