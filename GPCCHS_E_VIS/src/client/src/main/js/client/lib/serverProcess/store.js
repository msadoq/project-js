import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { get } from '../common/configurationManager';
import createMessagesMiddleware from '../store/middlewares/messages';
import createPlayerMiddleware from '../store/middlewares/player';
import createDocumentsMiddleware from '../store/middlewares/documents';
import makeServerEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import { main } from './ipc';
import documentManager from '../documentManager';

let store;

const middlewares = [
  thunk,
  createMessagesMiddleware(),
  createPlayerMiddleware(get('PLAYER_FREQUENCY'), get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN')),
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
