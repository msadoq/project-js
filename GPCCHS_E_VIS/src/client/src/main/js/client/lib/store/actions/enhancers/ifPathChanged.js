// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Add tests about action creators enhancers
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Rename some points in ifPathChanged action creator enhancer
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Change ifPathChanged action creator enhancer arguments
// VERSION : 1.1.2 : FA : #5475 : 22/02/2017 : Debug ifPathChanged higher order action creator
// END-HISTORY
// ====================================================================

import { resolve } from 'path';
import { compose, path } from 'lodash/fp';

const safeResolve = x => x && resolve(x);

// wrap an action creator in a thunk that dispatch it only when newPath
// is different from 'keyPath' corresponding path
const ifPathChanged = (actionCreator, key = 'views', keyPath = 'path', id = 'viewId') => (
  (...args) => (dispatch, getState) => {
    const action = actionCreator(...args);
    const getStateElement = compose(path([key, action.payload[id]]), getState);

    const newPath = action.payload.newPath;
    if (!getStateElement()) {
      return undefined;
    }
    const oldPath = getStateElement()[keyPath];
    if ((safeResolve(newPath) !== safeResolve(oldPath))) {
      return dispatch(action);
    }
    return undefined;
  }
);

export default ifPathChanged;
