import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { remote } from 'electron';
import makeRendererEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import { main } from './ipc';

let store;

function prepareEnhancers(type, isDebugOn) {
  const enhancer = makeRendererEnhancer(
    `renderer-${remote.getCurrentWindow().windowId}`,
    main.sendReduxDispatch
  );

  // renderer (no debug)
  if (!isDebugOn) {
    return compose(applyMiddleware(thunk), enhancer);
  }

  // renderer (with debug)
  const reduxLogger = createLogger({
    level: 'info',
    collapsed: true,
    // predicate: (state, action) => (
    //   !(action.type === types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP)
    // ),
  });

  const isThereDevTools = typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = isThereDevTools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  return composeEnhancers(applyMiddleware(thunk, reduxLogger), enhancer);
}

export default function makeCreateStore(type, isDebugOn) {
  return (initialState) => {
    const enhancer = prepareEnhancers(type, isDebugOn);
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
