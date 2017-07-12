import * as types from '../../../types';

const onCloseWorkspace = documentManager => (
  ({ dispatch }) => next => (action) => {
    const returnedAction = next(action);
    if (action.type === types.HSC_CLOSE_WORKSPACE) {
      console.log('close workspace');
    }
    return returnedAction;
  });

export default onCloseWorkspace;
