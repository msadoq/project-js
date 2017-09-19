import _ from 'lodash/fp';
import path from 'path';

import getLogger from '../common/logManager';
import parameters from '../common/configurationManager';
import { add as addMessage } from '../store/actions/messages';
import { askOpenWorkspace, isWorkspaceOpening } from '../store/actions/hsc';
import { askOpenPage } from '../store/actions/pages';
import { askOpenView } from '../store/actions/views';

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

const loadInitialDocuments = (dispatch, splashScreen) => {
  const documentsRoot = parameters.get('ISIS_DOCUMENTS_ROOT');
  const workspacePath = parameters.get('WORKSPACE');
  const pagePath = parameters.get('PAGE');
  const viewPath = parameters.get('VIEW');
  const batchedDispatch = _.each(dispatch);

  const logLoading = (fullPath) => {
    const fileName = path.basename(fullPath);
    splashScreen.setMessage(`loading ${fileName}...`);
    logger.info(`loading ${fileName}`);
  };

  if (documentsRoot && workspacePath) {
    logLoading(workspacePath);
    return dispatch(askOpenWorkspace(null, workspacePath, true));
  }

  if (documentsRoot && pagePath) {
    logLoading(pagePath);
    return dispatch(askOpenPage(null, pagePath));
  }

  if (documentsRoot && viewPath) {
    logLoading(viewPath);
    return dispatch(askOpenView(viewPath));
  }

  if (!documentsRoot) {
    return noFmdSupport(batchedDispatch);
  }

  return loadDefaultWorkspace(batchedDispatch, splashScreen);
};

export default loadInitialDocuments;
