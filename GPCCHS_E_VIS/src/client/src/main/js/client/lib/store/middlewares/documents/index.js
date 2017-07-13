import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import createViewsMiddleware from './views';
import createPagesMiddleware from './pages';
import createWorkspacesMiddleware from './workspace';
import createOpenLinkMiddleware from './links/openLink';

const createDocumentsMiddleware = documentManager => (
  pipeMiddlewares(
    createViewsMiddleware(documentManager),
    createPagesMiddleware(documentManager),
    createWorkspacesMiddleware(documentManager),
    createOpenLinkMiddleware(documentManager)
  )
);

export default createDocumentsMiddleware;
