import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import thunk from 'redux-thunk';

import { get } from 'common/parameters';
import reducer from './reducers';
import profiling from './middlewares/profiling';

let store;

export function initStore(initialState) {
  const middlewares = get('DEBUG') ? [profiling, thunk] : [thunk];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    electronEnhancer()
  );

  store = createStore(reducer, initialState, enhancer);
  return store;
}

export function getStore() {
  if (!store) {
    throw new Error('store wasn\'t inited yet');
  }
  return store;
}
