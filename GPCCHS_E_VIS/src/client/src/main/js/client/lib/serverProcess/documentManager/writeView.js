// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash';
import { dirname } from 'path';
import {
  LOG_DOCUMENT_SAVE,
  MIME_TYPES,
 } from 'constants';
import { createFolder } from 'common/fs';
import { isViewTypeSupported, getSchema, getViewModule } from 'viewManager';
import { dc } from '../ipc';
import validation from './validation';
import { writeDocument, exportData } from './io';
import { getRelativeFmdPath } from './fmd';

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

    switch (view.type) {
      case 'MimicView': {
        const contentPathValue = getRelativeFmdPath(path);
        const svgContent = preparedView.content;
        const mimicPreparedView = {
          ..._.omit(preparedView, 'content'),
          contentPath: contentPathValue.concat('.svg'),
        };
        exportData(svgContent, MIME_TYPES.ScalableVectorGraphics, path.concat('.svg'), (errSaving) => {
          if (errSaving) {
            return callback(errSaving);
          }
          return writeDocument(path, mimicPreparedView, (errWrite, oId) => {
            if (errWrite) {
              return callback(errWrite);
            }
            dc.sendProductLog(LOG_DOCUMENT_SAVE, 'view', path);
            return callback(null, oId);
          });
        });
        break;
      }
      default: { // default is all view types besides mimic
        return writeDocument(path, preparedView, (errWrite, oId) => {
          if (errWrite) {
            return callback(errWrite);
          }
          dc.sendProductLog(LOG_DOCUMENT_SAVE, 'view', path);
          return callback(null, oId);
        });
      }
    }
  });
};

export default {
  writeView,
};
