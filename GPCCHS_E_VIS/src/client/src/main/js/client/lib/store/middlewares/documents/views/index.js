// import * as types from '../../../types';
// import { openDialog } from '../../../actions/ui';

const createViewsMiddleware = () => () => next => action => next(action);

export default createViewsMiddleware;
