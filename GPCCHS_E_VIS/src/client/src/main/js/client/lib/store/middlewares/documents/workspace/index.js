// import * as types from '../../../types';
// import { openDialog } from '../../../actions/ui';
import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import onOpenWorkspace from './onOpenWorkspace';

const createWorkspaceMiddleware = documentManager => pipeMiddlewares(
  onOpenWorkspace(documentManager)
);

export default createWorkspaceMiddleware;
