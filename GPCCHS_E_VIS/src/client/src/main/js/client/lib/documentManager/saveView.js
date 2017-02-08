import { dirname } from 'path';
import omit from 'lodash/fp/omit';
import isArray from 'lodash/fp/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import _values from 'lodash/values';
// import _each from 'lodash/each';
import {
  DATASTRUCTURETYPE_RANGE,
  LOG_DOCUMENT_SAVE,
} from 'common/constants';

import { server } from '../mainProcess/ipc';

import validation from './validation';
import vivl from '../../VIVL/main';
import { createFolder } from '../common/fs';
import { writeDocument } from './io';

/**
 * Save view from state to file
 *
 * @param state
 * @param viewId
 * @param path
 * @param callback
 * @returns Error or undefined
 */
const saveViewAs = fmdApi => (viewConfiguration, viewType, path, callback) => {
  if (!viewConfiguration) {
    callback(new Error('Unknown view'));
    return;
  }
  createFolder(dirname(path), (err) => {
    if (err) {
      callback(err);
      return;
    }
    let view = _cloneDeep(viewConfiguration);

    let schema;
    let structureType;
    try {
      schema = vivl(view.type, 'getSchemaJson')();
      structureType = vivl(view.type, 'structureType')();
    } catch (e) {
      callback(new Error(`Invalid view type '${view.type}'`), view);
      return;
    }

    switch (structureType) {
      case DATASTRUCTURETYPE_RANGE: {
        view.axes = _values(view.axes);
        break;
      }
      default: {
        break;
      }
    }

    // Case of DynamicView
    if (view.type === 'DynamicView' && isArray(view.entryPoints)) {
      view.entryPoint = omit('name', view.entryPoints[0]);
      view = omit('entryPoints', view);
    }

    // Remove entry point id
    if (isArray(view.entryPoints)) {
      view.entryPoints = view.entryPoints.map(omit('id'));
    }

    const validationError = validation(view.type, view, schema);
    if (validationError) {
      callback(validationError);
      return;
    }

    writeDocument(fmdApi)(path, view, (errWrite, oId) => {
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
 * @param state
 * @param viewId
 * @param callback
 * @returns Error or undefined
 */
const saveView = fmdApi => (state, viewId, callback) => {
  if (!state.views[viewId]) {
    return callback(new Error('Unknown view id'));
  }
  const absPath = state.views[viewId].absolutePath ? state.views[viewId].absolutePath
                                                   : state.views[viewId].oId;
  if (!absPath) {
    return callback(new Error('Unknown path for saving text view'));
  }
  return saveViewAs(fmdApi)(
    state.views[viewId].configuration, state.views[viewId].type, absPath, callback
  );
};

export default {
  saveViewAs,
  saveView,
};
