import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import makeOnOpenWorkspace from './onOpenWorkspace';
import makeOnSaveWorkspace from './onSaveWorkspace';
import makeOnCloseWorkspace from './onCloseWorkspace';

const makeWorkspaceMiddleware = documentManager => pipeMiddlewares(
  makeOnOpenWorkspace(documentManager),
  makeOnSaveWorkspace(documentManager),
  makeOnCloseWorkspace(documentManager)
);

export default makeWorkspaceMiddleware;
