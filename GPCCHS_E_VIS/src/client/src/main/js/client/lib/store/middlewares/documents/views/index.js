import pipeMiddlewares from '../../../helpers/pipeMiddlewares';
import makeOnSaveView from './onSaveView';
import makeOnOpenView from './onOpenView';
import makeOnCloseView from './onCloseView';
import makeOnReloadView from './onReloadView';
import makeOnSaveViewAsModel from './onSaveViewAsModel';

const makeViewsMiddleware = documentManager => pipeMiddlewares(
  makeOnOpenView(documentManager),
  makeOnSaveView(documentManager),
  makeOnCloseView(documentManager),
  makeOnReloadView(documentManager),
  makeOnSaveViewAsModel(documentManager)
);

export default makeViewsMiddleware;
