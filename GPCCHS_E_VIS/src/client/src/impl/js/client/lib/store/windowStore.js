import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import thunk from 'redux-thunk';
import getLogger from 'common/log';
import createLogger from 'redux-logger';

import reducers from './reducers';

const logger = getLogger('WindowStore');

let store;

const isDebugOn = global.parameters.get('DEBUG') === 'on';

const dispatchProxy = (...args) => {
  logger.debug('receive action from main process', ...args);
  store.dispatch(...args);
};

let enhancer;
if (isDebugOn) {
  const reduxLogger = createLogger({
    level: 'info',
    collapsed: true,
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  enhancer = composeEnhancers(
    applyMiddleware(thunk, reduxLogger),
    electronEnhancer({ dispatchProxy })
  );
} else {
  enhancer = compose(
    applyMiddleware(thunk),
    electronEnhancer({ dispatchProxy }),
  );
}

export function initStore(initialState) {
  store = createStore(reducers, initialState, enhancer);

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
