import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createMessagesMiddleware from '../store/middlewares/messages';
import createPlayerMiddleware from '../store/middlewares/player';
import makeServerEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import { main } from './ipc';

let store;

const middlewares = [
  createMessagesMiddleware(),
  createPlayerMiddleware(),
  thunk,
];

export default function makeCreateStore() {
  return (initialState) => {
    const enhancer = compose(applyMiddleware(...middlewares), makeServerEnhancer(
      'server',
      main.sendReduxPatch
    ));
    store = createStore(reducer, initialState, enhancer);
    return store;
  };
}

export function getStore() {
  if (!store) {
    throw new Error('store wasn\'t inited yet');
  }
  return store;
}
