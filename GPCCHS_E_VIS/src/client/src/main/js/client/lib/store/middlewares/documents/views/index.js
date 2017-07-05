import * as types from '../../../types';
import { openDialog } from '../../../actions/ui';

export default function createViewsMiddleware(documentManager) {
  return ({ dispatch }) => next => (action) => {
    return next(action);
  };
}
