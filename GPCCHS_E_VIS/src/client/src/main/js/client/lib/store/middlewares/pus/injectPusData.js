import * as types from 'store/types';
import { injectPusRangeData } from 'store/actions/pus';


const injectPusData = () => ({ dispatch }) => next => (action) => {
  const nextAction = next(action);
  if (action.type !== types.NEW_PUS_DATA) {
    return nextAction;
  }
  const data = action.payload.data;
  dispatch(injectPusRangeData(data));

  return nextAction;
};

export default injectPusData;
