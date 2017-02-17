import { resolve } from 'path';
import { compose, path } from 'lodash/fp';

// wrap an action creator in a thunk that dispatch it only when newPath
// is different from 'keyPath' corresponding path
const ifPathChanged = (actionCreator, key = 'views', keyPath = 'path', id = 'viewId') => (
  (...args) => (dispatch, getState) => {
    const action = actionCreator(...args);
    const getStateElement = compose(path([key, action.payload[id]]), getState);

    const newPath = action.payload.newPath;
    if (!getStateElement() || !newPath) {
      return undefined;
    }
    const oldPath = getStateElement()[keyPath];
    if ((newPath && oldPath && resolve(newPath) !== resolve(oldPath))) {
      return dispatch(action);
    }
    return undefined;
  }
);

export default ifPathChanged;
