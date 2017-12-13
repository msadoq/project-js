// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Split documents middleware code in several middlewares
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Split documents middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Add helpers in documents middleware + refacto + opti pipeMiddlewares function
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move withOpenModal and withOpenDialog enhancers directly in each middleware
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move openLink middleware in documents middleware
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rename all create* middleware by make*
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
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
