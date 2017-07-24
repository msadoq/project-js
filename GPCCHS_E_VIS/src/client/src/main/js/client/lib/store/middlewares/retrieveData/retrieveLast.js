import * as types from '../../types';

const retrieveLast = () => ({ dispatch }) => next => (action) => {
  if (action.type === types.VIEWS_NEED_LAST) {
    console.log('[RetrieveLastData] VIEWS_NEED_LAST action');
  }
  return next(action);
};

export default retrieveLast;
