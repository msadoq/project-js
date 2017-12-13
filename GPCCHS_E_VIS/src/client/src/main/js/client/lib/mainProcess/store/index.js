// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store folder in mainProcess
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Fix little bug in wikiHelper middleware
// END-HISTORY
// ====================================================================

import _always from 'lodash/fp/always';
import open from 'opn';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { get } from 'common/configurationManager';
import makeMainEnhancer from './storeEnhancer';
import makeWikiHelperMiddleware from './middlewares/wikiHelper';
import { server } from '../ipc';

let store;

const middlewares = [
  makeWikiHelperMiddleware(open, () => get('USER_MANUAL_URL')),
];

export default function makeCreateStore(identity, isDebugOn) {
  return (initialState) => {
    const enhancer = compose(
      applyMiddleware(thunk),
      makeMainEnhancer(identity, server.sendReduxDispatch, isDebugOn),
      applyMiddleware(...middlewares)
    );
    store = createStore(_always({}), initialState, enhancer);
    return store;
  };
}

export function getStore() {
  if (!store) {
    throw new Error('store wasn\'t inited yet');
  }
  return store;
}
