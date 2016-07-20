import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureMainStore(initialState, debug) {
  const logger = debug
    ? createLogger({ level: 'info', collapsed: true })
    : () => {};

  const enhancer = compose(
    applyMiddleware(thunk, logger),
    electronEnhancer()
  );

  const store = createStore(rootReducer, initialState, enhancer);

  // @todo : doesn't work, hot reloading is not activated for main process, see webpack config
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      delete require.cache[require.resolve('../reducers')];
      store.replaceReducer(require('../reducers')); // eslint-disable-line global-require
      event.returnValue = true;
    });
  }

  return store;
}
