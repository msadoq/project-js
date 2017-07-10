import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import onSaveView from './onSaveView';
import onOpenView from './onOpenView';

const createViewsMiddleware = documentManager => pipeMiddlewares(
  onOpenView(documentManager),
  onSaveView(documentManager)
);

export default createViewsMiddleware;
