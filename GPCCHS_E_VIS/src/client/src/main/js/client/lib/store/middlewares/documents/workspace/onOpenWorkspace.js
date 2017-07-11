import * as types from '../../../types';
import { closeWorkspace, isWorkspaceOpening } from '../../../actions/hsc';

const onOpenWorkspace = documentManager => (
  ({ dispatch }) => next => (action) => {
    const returnedAction = next(action);
    if (action.type === types.HSC_OPEN_NEW_WORKSPACE) {
      dispatch(isWorkspaceOpening(true));
      dispatch(closeWorkspace(!!action.payload.keepMessages));
      dispatch({
        type: types.WS_WORKSPACE_OPENED,
        payload: documentManager.createBlankWorkspace() 
      });
      dispatch(isWorkspaceOpening(false));
    }
    return returnedAction;
  });

export default onOpenWorkspace;
