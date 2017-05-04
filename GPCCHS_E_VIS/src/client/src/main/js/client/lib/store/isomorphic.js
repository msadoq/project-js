import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { get } from 'common/parameters';
import { electronEnhancer } from 'redux-electron-store';
import reducer from './reducers';
import * as types from './types';

let store;

export function initStore() {
  let enhancer;
  if (process.type === 'renderer' && get('DEBUG') === 'on') {
    // renderer store
    const hideTimestampActions = get('HIDE_TIMESTAMP_ACTIONS');
    const reduxLogger = createLogger({
      level: 'info',
      collapsed: false,
      predicate: (state, action) => (
        !(hideTimestampActions && action.type === types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP)
      ),
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    enhancer = composeEnhancers(
      applyMiddleware(thunk, reduxLogger),
      electronEnhancer()
    );
  } else {
    // main and server store
    enhancer = compose(
      applyMiddleware(thunk),
      electronEnhancer()
    );
  }

  store = createStore(reducer, undefined, enhancer);
  return store;
}

export function getStore() {
  if (!store) {
    throw new Error('store wasn\'t inited yet');
  }
  return store;
}
