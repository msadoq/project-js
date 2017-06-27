import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import makeMainEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import { server } from './ipc';

let store;

export default function makeCreateStore(identity, isDebugOn) {
  return (initialState) => {
    const enhancer = compose(applyMiddleware(thunk), makeMainEnhancer(
      identity,
      server.sendReduxDispatch,
      isDebugOn
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
