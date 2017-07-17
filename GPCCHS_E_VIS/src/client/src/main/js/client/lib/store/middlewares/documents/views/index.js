import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import onSaveView from './onSaveView';
import onOpenView from './onOpenView';
import onCloseView from './onCloseView';

const createViewsMiddleware = documentManager => pipeMiddlewares(
  onOpenView(documentManager),
  onSaveView(documentManager),
  onCloseView(documentManager)
);

export default createViewsMiddleware;
