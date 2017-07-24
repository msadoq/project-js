import * as types from '../../types';

const retrieveRange = () => ({ dispatch }) => next => (action) => {
  if (action.type === types.VIEWS_NEED_RANGE) {
    console.log('[retrieveRange] VIEWS_NEED_RANGE action');
  }
  return next(action);
};

export default retrieveRange;
