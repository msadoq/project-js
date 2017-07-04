import * as types from '../../../types';
import { openDialog } from '../../../actions/ui';
import createDialogInteraction from '../dialogUtils';

export default function createViewsMiddleware(documentManager) {
  return ({ dispatch }) => next => (action) => {
    return next(action);
  };
}
