import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import createViewsMiddleware from './views';
import createPagesMiddleware from './pages';
import createWorkspacesMiddleware from './workspaces';

const createDocumentsMiddleware = documentManager => pipeMiddlewares(
  createViewsMiddleware(documentManager),
  createPagesMiddleware(documentManager),
  createWorkspacesMiddleware(documentManager)
);

export default createDocumentsMiddleware;
