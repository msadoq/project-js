import * as types from 'store/types';
import { injectPusData } from 'store/actions/pus';


const injectPusDataMiddleware = () => ({ dispatch }) => next => (action) => {
  const nextAction = next(action);
  if (action.type !== types.NEW_PUS_DATA) {
    return nextAction;
  }
  const data = action.payload.data;
  dispatch(injectPusData(data));

  return nextAction;
};

export default injectPusDataMiddleware;
