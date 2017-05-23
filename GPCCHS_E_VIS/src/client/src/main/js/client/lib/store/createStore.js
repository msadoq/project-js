import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { get } from 'common/parameters';
import { electronEnhancer } from 'redux-electron-store';
import serverEnhancer from './enhancers/server';
import mainEnhancer from './enhancers/main';
import rendererEnhancer from './enhancers/renderer';
import reducer from './reducers';
import * as types from './types';

let store;

function prepareEnhancers(type, isDebugOn) {
  // process.type is not set in Node.js process
  if (type === 'server') {
    return compose(applyMiddleware(thunk), electronEnhancer(), serverEnhancer);
  }
  if (type === 'main') {
    return compose(applyMiddleware(thunk), electronEnhancer(), mainEnhancer);
  }

  // renderer (no debug)
  if (!isDebugOn) {
    return compose(applyMiddleware(thunk), electronEnhancer(), rendererEnhancer);
  }

  // renderer (with debug)
  const hideTimestampActions = get('HIDE_TIMESTAMP_ACTIONS');
  const reduxLogger = createLogger({
    level: 'info',
    collapsed: true,
    predicate: (state, action) => (
      !(hideTimestampActions && action.type === types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP)
    ),
  });

  const isThereDevTools = typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = isThereDevTools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  return composeEnhancers(
    applyMiddleware(thunk, reduxLogger),
    electronEnhancer(),
    rendererEnhancer
  );
}

export default function makeCreateStore(type, isDebugOn) {
  return () => {
    const enhancer = prepareEnhancers(type, isDebugOn);
    store = createStore(reducer, undefined, enhancer);
    return store;
  };
}

export function getStore() {
  if (!store) {
    throw new Error('store wasn\'t inited yet');
  }
  return store;
}
