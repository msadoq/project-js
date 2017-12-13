// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Split documents middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Add helpers in documents middleware + refacto + opti pipeMiddlewares function
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Lint documents middleware . .
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Add workspace middleware => TODO : onWsClose
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Correct VIMA shutdown on new workspace : add middleware for synchronous treatment
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rename all create* middleware by make*
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
import makeOnOpenWorkspace from './onOpenWorkspace';
import makeOnSaveWorkspace from './onSaveWorkspace';
import makeOnCloseWorkspace from './onCloseWorkspace';

const makeWorkspaceMiddleware = documentManager => pipeMiddlewares(
  makeOnOpenWorkspace(documentManager),
  makeOnSaveWorkspace(documentManager),
  makeOnCloseWorkspace(documentManager)
);

export default makeWorkspaceMiddleware;
