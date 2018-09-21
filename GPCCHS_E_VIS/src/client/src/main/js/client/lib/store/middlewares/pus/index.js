import * as types from 'store/types';
import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
import injectPusDataMiddleware from './incomingData/injectPusData';

const makeCallback = () => () => {};

const pusMiddleware = ipc => (/* { dispatch, getState } */) => next => (action) => {
  if (action.type === types.PUS_TEMP_INITIALIZE) {
    ipc.pus.initialize(
      action.payload.forReplay,
      action.payload.firstTime,
      action.payload.lastTime,
      action.payload.continuous,
      makeCallback(action.type));
  }
  if (action.type === types.PUS_TEMP_SUBSCRIBE) {
    ipc.pus.subscribe(
      action.payload.pusId,
      action.payload.apId,
      makeCallback(action.type));
  }
  if (action.type === types.PUS_TEMP_UNSUBSCRIBE) {
    ipc.pus.unsubscribe(action.payload.pusId, action.payload.apId, makeCallback(action.type));
  }
  if (action.type === types.PUS_TEMP_COMPARE) {
    ipc.pus.compare(
      action.payload.firstDate,
      action.payload.secondDate,
      makeCallback(action.type)
    );
  }
  if (action.type === types.PUS_TEMP_RESET) {
    ipc.pus.reset(
      action.payload.initialisationMode,
      action.payload.resetType,
      action.payload.date,
      makeCallback(action.type)
    );
  }
  return next(action);
};

export const createPusDataMiddleware = () => pipeMiddlewares(
  injectPusDataMiddleware()
);
export default pusMiddleware;

