// import * as types from '../../../types';
// import { openDialog } from '../../../actions/ui';

const createWorkspaceMiddleware = () => () => next => action => next(action);

export default createWorkspaceMiddleware;
