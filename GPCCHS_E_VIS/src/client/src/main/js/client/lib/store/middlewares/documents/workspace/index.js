import * as types from '../../../types';
import { openDialog } from '../../../actions/ui';

export default function createWorkspacesMiddleware(documentManager) {
  return ({ dispatch }) => next => (action) => {
    return next(action);
  };
}
