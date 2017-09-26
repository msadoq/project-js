// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Split documents middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rename all create* middleware by make*
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import makeOnOpenPage from './onOpenPage';
import makeOnClosePage from './onClosePage';
import makeOnSavePage from './onSavePage';

const makePagesMiddleware = documentManager => pipeMiddlewares(
  makeOnOpenPage(documentManager),
  makeOnSavePage(documentManager),
  makeOnClosePage(documentManager)
);

export default makePagesMiddleware;
