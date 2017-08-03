import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { get } from '../common/configurationManager';
import makeIncomingMessage from '../store/middlewares/incomingData';
import createIncomingDataMiddleware from '../store/middlewares/incomingData2';
import createRetrieveDataMiddleware from '../store/middlewares/retrieveData';
import makeServerEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import { main } from './ipc';
import documentManager from './documentManager';
import lokiManager from './models/lokiKnownRangesData';
// =======
import makeMessagesMiddleware from '../store/middlewares/messages';
import makePlayerMiddleware from '../store/middlewares/player';
import makeDocumentsMiddleware from '../store/middlewares/documents';
import makeInspectorMiddleware from '../store/middlewares/inspector';
import * as rtdManager from '../rtdManager';

let store;

const middlewares = [
  thunk,
  makeIncomingMessage(get('INCOMING_DATA_INJECTION_FREQUENCY')),
  createIncomingDataMiddleware(lokiManager),
  createRetrieveDataMiddleware(),
// =======
  makeMessagesMiddleware(),
  makePlayerMiddleware(get('PLAYER_FREQUENCY'), get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN')),
  makeDocumentsMiddleware(documentManager),
  makeInspectorMiddleware(rtdManager),
];

export default function makeCreateStore(identity, isDebugOn) {
  return (initialState) => {
    const enhancer = compose(applyMiddleware(...middlewares), makeServerEnhancer(
      identity,
      main.sendReduxPatch,
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
