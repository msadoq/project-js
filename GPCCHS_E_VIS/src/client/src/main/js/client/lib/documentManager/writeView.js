import { dirname } from 'path';
import { LOG_DOCUMENT_SAVE } from '../constants';

import { server } from '../mainProcess/ipc';
import validation from './validation';
import { createFolder } from '../common/fs';
import { writeDocument } from './io';
import { isViewTypeSupported, getSchema, getViewModule } from '../viewManager';

const writeView = (view, path, callback) => {
  if (!view) {
    return callback(new Error('No view'));
  }
  return createFolder(dirname(path), (err) => {
    if (err) {
      return callback(err);
    }
    if (!isViewTypeSupported(view.type)) {
      return callback(new Error(`Invalid view type '${view.type}'`), view);
    }

    const preparedView = getViewModule(view.type).prepareViewForFile(view);

    const schema = getSchema(view.type);
    const validationError = validation(view.type, preparedView, schema);
    console.log('HERE -1', validationError);
    if (validationError) {
      return callback(validationError);
    }

    return writeDocument(path, preparedView, (errWrite, oId) => {
      console.log('HERE0', errWrite);
      if (errWrite) {
        return callback(errWrite);
      }
      server.sendProductLog(LOG_DOCUMENT_SAVE, 'view', path);
      return callback(null, oId);
    });
  });
};

export default {
  writeView,
};
