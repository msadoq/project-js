import * as types from '../../types';

const injectData = () => ({ dispatch }) => next => (action) => { // eslint-disable-line
  if (action.type === types.INJECT_NEW_DATA) {
    console.log('[InjectDataMiddleware] INJECT_NEW_DATA action');
  }
  return next(action);
};

export default injectData;
