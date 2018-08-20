import _ from 'lodash/fp';

import { getVisuWindowByViewId } from '../../selectors/views';


const addVisuWindow = ({ getState }) => next => (action) => {
  const state = getState();

  const viewId = _.get(['payload', 'viewId'], action);

  if (!viewId) {
    return next(action);
  }

  const visuWindow = getVisuWindowByViewId(state, { viewId });

  const enhancedAction = _.set(['payload', 'visuWindow'], visuWindow, action);

  return next(enhancedAction);
};

export default addVisuWindow;
