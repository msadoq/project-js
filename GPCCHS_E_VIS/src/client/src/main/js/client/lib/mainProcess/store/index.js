// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store
//  folder in mainProcess
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Fix little bug in wikiHelper middleware
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2215 : 22/01/2018 : Add createTempStore utils . .
// END-HISTORY
// ====================================================================

import _always from 'lodash/fp/always';
import open from 'opn';
import { createStore, applyMiddleware, compose } from 'redux';
import createTempStore from 'store/helpers/createTempStore';
import thunk from 'redux-thunk';
import { get } from 'common/configurationManager';
import makeMainEnhancer from './storeEnhancer';
import makeWikiHelperMiddleware from './middlewares/wikiHelper';
import { server } from '../ipc';

let store = createTempStore();

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
    store = store.replaceStore(createStore(_always({}), initialState, enhancer));
    return store;
  };
}

export const getStore = () => store;
