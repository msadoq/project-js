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

const saveViewAs = (view, viewType, path, callback) => {
  if (!view) {
    callback(new Error('No view'));
    return;
  }
  createFolder(dirname(path), (err) => {
    if (err) {
      callback(err);
      return;
    }
    if (!isViewTypeSupported(viewType)) {
      callback(new Error(`Invalid view type '${viewType}'`), view);
      return;
    }

    const viewToSave = _cloneDeep(view);

    // Remove entry point id
    // TODO -> viewManager
    if (_isArray(viewToSave.configuration.entryPoints)) {
      viewToSave.configuration.entryPoints = viewToSave.configuration.entryPoints.map(_omit('id'));
    }

    const preparedView = getViewModule(viewType).prepareViewForFile(viewToSave);

    const schema = getSchema(viewType);
    const validationError = validation(viewType, preparedView, schema);
    if (validationError) {
      callback(validationError);
      return;
    }

    writeDocument(path, preparedView, (errWrite, oId) => {
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
