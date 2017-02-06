import { resolve } from 'path';
import { compose, pathOr } from 'lodash/fp';

// wrap an action creator in a thunk that dispatch it only when newPath
// is different from 'keyPath' corresponding path
const ifPathChanged = (actionCreator, [key = 'views', keyPath = 'path', id = 'viewId']) => (
  (...args) => (dispatch, getState) => {
    const action = actionCreator(...args);
    const getView = compose(pathOr({}, [key, action.payload[id]]), getState);

    const newPath = action.payload.newPath;
    const oldPath = getView()[keyPath];
    if (!getView() || !newPath) {
      return;
    }
    if ((newPath && oldPath && resolve(newPath) !== resolve(oldPath))) {
      dispatch(action);
    }
  }
);

export default ifPathChanged;
