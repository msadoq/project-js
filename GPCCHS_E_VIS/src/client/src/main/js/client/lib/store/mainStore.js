import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import fs from 'fs';
import thunk from 'redux-thunk';
import { ipcMain } from 'electron';
import reducer from './reducers';

let store;

export function initStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    electronEnhancer()
  );

  store = createStore(reducer, initialState, enhancer);
  return enhancer(store);
}

const walkSync = (dir, fn) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    if (fs.statSync(dir + file).isDirectory()) {
      walkSync(`${dir}${file}/`, fn);
    } else {
      fn(`${dir}${file}`);
    }
  });
};

ipcMain.on('renderer-reload', (event) => {
  // Remove all reducer files from cache
  walkSync(
    require.resolve('./reducers').replace(/index.js$/, ''),
    path => /\/[^.]+\.js$/.test(path) && delete require.cache[path]
  );

  // Require and replace them
  // eslint-disable-next-line global-require, "DV6 TBC_CNES Hot reload require contextual requires"
  const reducers = require('./reducers');
  store.replaceReducer(reducers);

  // eslint-disable-next-line no-param-reassign, "DV6 TBC_CNES Hot reload require returnValue set"
  event.returnValue = true;
});

export function getStore() {
  if (!store) {
    throw new Error('store wasn\'t inited yet');
  }
  return store;
}
