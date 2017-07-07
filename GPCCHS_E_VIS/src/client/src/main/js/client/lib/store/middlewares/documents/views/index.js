import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import onOpenView from './onOpenView';

const createViewsMiddleware = documentManager => pipeMiddlewares(
  onOpenView(documentManager)
);

export default createViewsMiddleware;
