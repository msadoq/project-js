import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { get } from '../common/configurationManager';
import createMessagesMiddleware from '../store/middlewares/messages';
import createPlayerMiddleware from '../store/middlewares/player';
import createOpenLinkMiddleware from '../store/middlewares/openLink';
import makeServerEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import { main } from './ipc';
import documentManager from '../documentManager';

let store;

const middlewares = [
  thunk,
  createMessagesMiddleware(),
  createPlayerMiddleware(get('PLAYER_FREQUENCY'), get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN')),
  createOpenLinkMiddleware(documentManager),
];

export default function makeCreateStore() {
  return (initialState) => {
    const enhancer = compose(applyMiddleware(...middlewares), makeServerEnhancer(
      'server',
      main.sendReduxPatch
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
