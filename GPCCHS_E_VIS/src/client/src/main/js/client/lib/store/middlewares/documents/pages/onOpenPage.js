import * as types from '../../../types';

const onOpenPage = documentManager => (
  ({ dispatch, openDialog }) => next => (action) => {
    const returnedAction = next(action);
    if (action.type === types.WS_ASK_OPEN_PAGE) {
      const { windowId, absolutePath } = action.payload;
      if (absolutePath) {
        dispatch(documentManager.openPage({ windowId, absolutePath }));
      } else {
        openDialog(windowId, 'open', {}, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            dispatch(documentManager.openPage({ windowId, absolutePath: choice[0] }));
          }
        });
      }
    }
    return returnedAction;
  }
);

export default onOpenPage;
