import * as types from 'store/types';

const makeCallback = (type) => {
  return () => {
    console.log(`Callback called on ${type}`);
  };
};

const pusTestMiddleware = ipc => ({ dispatch, getState }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.PUS_TEMP_INITIALIZE) {
    ipc.pus.initialize(`${Date.now()}`, makeCallback(action.type));
  }
  if (action.type === types.PUS_TEMP_SUBSCRIBE) {
    ipc.pus.subscribe(`${Date.now()}`, makeCallback(action.type));
  }
  if (action.type === types.PUS_TEMP_UNSUBSCRIBE) {
    ipc.pus.unsubscribe(`${Date.now()}`, makeCallback(action.type));
  }
  if (action.type === types.PUS_TEMP_COMPARE) {
    ipc.pus.compare(`${Date.now()}`, makeCallback(action.type));
  }
  if (action.type === types.PUS_TEMP_RESET) {
    ipc.pus.reset(`${Date.now()}`, makeCallback(action.type));
  }
  return nextAction;
};

export default pusTestMiddleware;

