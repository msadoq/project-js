import _ from 'lodash/fp';
import path from 'path';

import getLogger from '../common/logManager';
import parameters from '../common/configurationManager';
import { add as addMessage } from '../store/actions/messages';
import { askOpenWorkspace, isWorkspaceOpening } from '../store/actions/hsc';
import { askOpenPage } from '../store/actions/pages';
// import { askOpenView } from '../store/actions/views';

const logger = getLogger('main:loadInitialDocuments');

const askOpenNewWorkspace = (absolutePath = null) =>
  askOpenWorkspace(null, absolutePath, true, false);

const noFmdSupport = (batchedDispatch) => {
  logger.warn('No ISIS_DOCUMENTS_ROOT found');
  batchedDispatch([
    addMessage('global', 'warning', 'No FMD support'),
    askOpenNewWorkspace(),
  ]);
};

const loadDefaultWorkspace = (batchedDispatch, splashScreen) => {
  splashScreen.setMessage('loading default workspace...');
  logger.info('loading default blank workspace');
  batchedDispatch([
    addMessage('global', 'info', 'No VIEW, PAGE or WORKSPACE found'),
    isWorkspaceOpening(true),
    askOpenNewWorkspace(),
  ]);
};

const loadWorkspace = (batchedDispatch, splashScreen, absPath) => {
  const fileName = path.basename(absPath);
  splashScreen.setMessage(`loading ${fileName}...`);
  logger.info(`loading ${fileName}`);

  batchedDispatch([
    isWorkspaceOpening(true),
    askOpenWorkspace(null, absPath, true),
  ]);
};

const loadInitialDocuments = (dispatch, splashScreen) => {
  const documentsRoot = parameters.get('ISIS_DOCUMENTS_ROOT');
  const workspace = parameters.get('WORKSPACE');
  const page = parameters.get('PAGE');
  // const view = parameters.get('VIEW');
  const batchedDispatch = _.each(dispatch);
  // const getPath = relativePath => path.join(documentsRoot, relativePath);

  // if (documentsRoot && view) {
  //   dispatch(askOpenNewWorkspace());
  //   setTimeout(() => {
  //     dispatch(askOpenView(getPath(view)));
  //   }, 1000);
  //   return;
  //   // return dispatch(askOpenView(getPath(view)));
  // }

  if (documentsRoot && workspace) {
    return loadWorkspace(batchedDispatch, splashScreen, workspace);
  }

  if (documentsRoot && page) {
    return dispatch(askOpenPage(null, page));
  }

  if (!documentsRoot) {
    return noFmdSupport(batchedDispatch);
  }

  return loadDefaultWorkspace(batchedDispatch, splashScreen);
};

export default loadInitialDocuments;
