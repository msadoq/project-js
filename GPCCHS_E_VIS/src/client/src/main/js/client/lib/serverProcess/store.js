import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { get } from '../common/configurationManager';
import createIncomingDataMiddleware from '../store/middlewares/incomingData';
import createRetrieveDataMiddleware from '../store/middlewares/retrieveData';
import createCacheMiddleware from '../store/middlewares/cache';
import makeServerEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import ipc from './ipc';
import documentManager from './documentManager';
import lokiManager from './models/lokiKnownRangesData';
import makeMessagesMiddleware from '../store/middlewares/messages';
import makePlayerMiddleware from '../store/middlewares/player';
import makeDocumentsMiddleware from '../store/middlewares/documents';
import makeInspectorMiddleware from '../store/middlewares/inspector';
import * as rtdManager from '../rtdManager';

let store;

const middlewares = [
  thunk,
  createIncomingDataMiddleware(lokiManager),
  createRetrieveDataMiddleware(ipc),
  createCacheMiddleware(lokiManager),
  makeMessagesMiddleware(),
  makePlayerMiddleware(get('PLAYER_FREQUENCY'), get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN')),
  makeDocumentsMiddleware(documentManager),
  makeInspectorMiddleware(rtdManager),
];

export default function makeCreateStore(identity, isDebugOn) {
  return (initialState) => {
    const enhancer = compose(applyMiddleware(...middlewares), makeServerEnhancer(
      identity,
      ipc.main.sendReduxPatch,
      isDebugOn
    ));
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
