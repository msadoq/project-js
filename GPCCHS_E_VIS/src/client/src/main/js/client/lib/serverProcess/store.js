import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createMessagesMiddleware from '../store/middlewares/messages';
import makeServerEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import { main } from './ipc';

let store;

export default function makeCreateStore() {
  return (initialState) => {
    const enhancer = compose(applyMiddleware(createMessagesMiddleware(), thunk), makeServerEnhancer(
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
