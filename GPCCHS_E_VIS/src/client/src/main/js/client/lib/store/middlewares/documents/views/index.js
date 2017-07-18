import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import onSaveView from './onSaveView';
import onOpenView from './onOpenView';
import onCloseView from './onCloseView';
import onReloadView from './onReloadView';
import onSaveViewAsModel from './onSaveViewAsModel';

const createViewsMiddleware = documentManager => pipeMiddlewares(
  onOpenView(documentManager),
  onSaveView(documentManager),
  onCloseView(documentManager),
  onReloadView(documentManager),
  onSaveViewAsModel(documentManager)
);

export default createViewsMiddleware;
