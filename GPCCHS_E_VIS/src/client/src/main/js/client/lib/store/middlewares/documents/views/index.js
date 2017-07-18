import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import onSaveView from './onSaveView';
import onOpenView from './onOpenView';
import onCloseView from './onCloseView';
import onReloadView from './onReloadView';

const createViewsMiddleware = documentManager => pipeMiddlewares(
  onOpenView(documentManager),
  onSaveView(documentManager),
  onCloseView(documentManager),
  onReloadView(documentManager)
);

export default createViewsMiddleware;
