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
