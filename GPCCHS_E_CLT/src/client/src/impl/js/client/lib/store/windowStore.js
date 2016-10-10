import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';

let store;

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const enhancer = compose(
  applyMiddleware(thunk, logger),
  electronEnhancer(true),
  window.devToolsExtension
    // TODO seems to need to pass all action:
    // https://github.com/chentsulin/electron-react-boilerplate/blob/master/app/store/configureStore.development.js#L25
    ? window.devToolsExtension()
    : noop => noop
);

export function initStore(initialState) {
  store = createStore(reducer, initialState, enhancer);

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
