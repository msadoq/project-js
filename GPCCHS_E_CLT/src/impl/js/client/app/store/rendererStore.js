import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function(initialState, debug) {
  const filter = {
    windows: true,
    pages: true,
    views: true,
    subscriptions: true,
  };

  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  const enhancer = compose(
    applyMiddleware(thunk, logger),
    electronEnhancer(filter),
    (typeof window !== 'undefined' && window.devToolsExtension)
      ? window.devToolsExtension()
      : noop => noop
  );

  const store = createStore(rootReducer, initialState, enhancer);

  if (window.devToolsExtension) {
    window.devToolsExtension.updateStore(store);
  }

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
