import _ from 'lodash/fp';
import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import createViewsMiddleware from './views';
import createPagesMiddleware from './pages';
import createWorkspacesMiddleware from './workspace';
import { withOpenDialog, withOpenModal } from './helpers';

const enhancer = _.compose(withOpenModal, withOpenDialog);
const createDocumentsMiddleware = documentManager => enhancer(
  pipeMiddlewares(
    createViewsMiddleware(documentManager),
    createPagesMiddleware(documentManager),
    createWorkspacesMiddleware(documentManager)
  )
);

export default createDocumentsMiddleware;
