// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import { dirname } from 'path';
import { LOG_DOCUMENT_SAVE } from '../../constants';

import { dc } from '../ipc';
import validation from './validation';
import { createFolder } from '../../common/fs';
import { writeDocument } from './io';
import { isViewTypeSupported, getSchema, getViewModule } from '../../viewManager';

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
    if (validationError) {
      return callback(validationError);
    }

    return writeDocument(path, preparedView, (errWrite, oId) => {
      if (errWrite) {
        return callback(errWrite);
      }
      dc.sendProductLog(LOG_DOCUMENT_SAVE, 'view', path);
      return callback(null, oId);
    });
  });
};

export default {
  writeView,
};
