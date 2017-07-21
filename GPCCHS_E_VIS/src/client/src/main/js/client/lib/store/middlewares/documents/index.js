import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import makeViewsMiddleware from './views';
import makePagesMiddleware from './pages';
import makeWorkspacesMiddleware from './workspace';
import makeOpenLinkMiddleware from './links/openLink';

const makeDocumentsMiddleware = documentManager => (
  pipeMiddlewares(
    makeViewsMiddleware(documentManager),
    makePagesMiddleware(documentManager),
    makeWorkspacesMiddleware(documentManager),
    makeOpenLinkMiddleware(documentManager)
  )
);

export default makeDocumentsMiddleware;
