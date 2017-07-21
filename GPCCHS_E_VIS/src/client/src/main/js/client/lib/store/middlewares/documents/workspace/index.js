import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import onOpenWorkspace from './onOpenWorkspace';
import onSaveWorkspace from './onSaveWorkspace';
import onCloseWorkspace from './onCloseWorkspace';

const makeWorkspaceMiddleware = documentManager => pipeMiddlewares(
  onOpenWorkspace(documentManager),
  onSaveWorkspace(documentManager),
  onCloseWorkspace(documentManager)
);

export default makeWorkspaceMiddleware;
