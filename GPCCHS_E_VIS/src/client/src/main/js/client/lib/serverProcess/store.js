import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { get } from '../common/configurationManager';
import makeMessagesMiddleware from '../store/middlewares/messages';
import makePlayerMiddleware from '../store/middlewares/player';
import makeDocumentsMiddleware from '../store/middlewares/documents';
import makeInspectorMiddleware from '../store/middlewares/inspector';
import makeProductLogMiddleware from '../store/middlewares/productLog';
import makeServerEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import { main, dc } from './ipc';
import * as rtdManager from '../rtdManager';
import documentManager from './documentManager';

let store;

const middlewares = [
  thunk,
  makeMessagesMiddleware(),
  makePlayerMiddleware(get('PLAYER_FREQUENCY'), get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN')),
  makeDocumentsMiddleware(documentManager),
  makeInspectorMiddleware(rtdManager),
  makeProductLogMiddleware(dc.sendProductLog),
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
