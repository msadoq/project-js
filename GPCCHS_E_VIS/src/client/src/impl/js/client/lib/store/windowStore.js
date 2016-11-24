import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';

let store;

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const enhancer = compose(
  applyMiddleware(thunk, logger),
  electronEnhancer(),
  window.devToolsExtension
    ? window.devToolsExtension()
    : noop => noop
);

export function initStore(initialState) {
  store = createStore(reducers, initialState, enhancer);
  if (window.devToolsExtension) {
    window.devToolsExtension.updateStore(store);
  }

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers')) // eslint-disable-line global-require
    );
  }
}

export function getStore() {
  if (!store) {
    throw new Error('store wasn\'t inited yet');
  }
  return store;
}
