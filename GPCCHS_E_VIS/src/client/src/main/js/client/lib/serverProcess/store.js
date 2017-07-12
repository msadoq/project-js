import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { get } from '../common/configurationManager';
import makeIncomingMessage from '../store/middlewares/incomingData';
import createMessagesMiddleware from '../store/middlewares/messages';
import createPlayerMiddleware from '../store/middlewares/player';
import createOpenLinkMiddleware from '../store/middlewares/openLink';
import createDocumentsMiddleware from '../store/middlewares/documents';
import makeServerEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import { main } from './ipc';
import documentManager from '../documentManager';

let store;

const middlewares = [
  thunk,
  makeIncomingMessage(get('INCOMING_DATA_INJECTION_FREQUENCY')),
  createMessagesMiddleware(),
  createPlayerMiddleware(get('PLAYER_FREQUENCY'), get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN')),
  createOpenLinkMiddleware(documentManager),
  createDocumentsMiddleware(documentManager),
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
