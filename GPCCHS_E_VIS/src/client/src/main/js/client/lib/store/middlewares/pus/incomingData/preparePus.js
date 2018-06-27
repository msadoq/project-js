import * as types from 'store/types';
import { newPusData } from 'store/actions/pus';


const preparePus = () => ({ dispatch }) => next => (action) => {
  const nextAction = next(action);
  if (action.type !== types.INCOMING_PUS_DATA) {
    return nextAction;
  }
  const data = action.payload.data;
  dispatch(newPusData(data));

  return nextAction;
};

export default preparePus;
