import * as types from 'store/types';
import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
import injectPusData from './injectPusData';
import preparePusRange from './preparePusRange';

const makeCallback = () => () => {};

const pusTestMiddleware = ipc => (/* { dispatch, getState } */) => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.PUS_TEMP_INITIALIZE) {
    ipc.pus.initialize(action.payload.pusId, action.payload.apId, makeCallback(action.type));
  }
  if (action.type === types.PUS_TEMP_SUBSCRIBE) {
    ipc.pus.subscribe(action.payload.pusId, action.payload.apId, makeCallback(action.type));
  }
  if (action.type === types.PUS_TEMP_UNSUBSCRIBE) {
    ipc.pus.unsubscribe(action.payload.pusId, action.payload.apId, makeCallback(action.type));
  }
  if (action.type === types.PUS_TEMP_COMPARE) {
    ipc.pus.compare(
      action.payload.pusId,
      action.payload.apId,
      action.payload.date,
      makeCallback(action.type)
    );
  }
  if (action.type === types.PUS_TEMP_RESET) {
    ipc.pus.reset(
      action.payload.pusId,
      action.payload.apId,
      action.payload.date,
      makeCallback(action.type)
    );
  }
  return nextAction;
};

export const createPusDataMiddleware = () => pipeMiddlewares(
  injectPusData(),
  preparePusRange()
);
export default pusTestMiddleware;

