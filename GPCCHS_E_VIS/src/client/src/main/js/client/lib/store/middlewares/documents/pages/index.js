import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import onOpenPage from './onOpenPage';
import onClosePage from './onClosePage';
import onSavePage from './onSavePage';

const createPagesMiddleware = documentManager => pipeMiddlewares(
  onOpenPage(documentManager),
  onSavePage(documentManager),
  onClosePage(documentManager)
);

export default createPagesMiddleware;
