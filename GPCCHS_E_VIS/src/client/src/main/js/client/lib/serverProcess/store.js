import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { get } from '../common/configurationManager';
import createIncomingDataMiddleware from '../store/middlewares/incomingData';
import createDumpBufferMiddleware from '../store/middlewares/dumpBuffer';
import createRetrieveDataMiddleware from '../store/middlewares/retrieveData';
import createCacheMiddleware from '../store/middlewares/cache';
import reducer from '../store/reducers';
import ipc from './ipc';
import documentManager from './documentManager';
import lokiManager from './models/lokiKnownRangesData';
import makeMessagesMiddleware from '../store/middlewares/messages';
import makePlayerMiddleware from '../store/middlewares/player';
import makeOnProcessOverload from '../store/middlewares/player/processOverload';
import makeDocumentsMiddleware from '../store/middlewares/documents';
import makeInspectorMiddleware from '../store/middlewares/inspector';
import * as rtdManager from '../rtdManager';
import makeProductLogMiddleware from '../store/middlewares/productLog';
import makePatchGenerator from '../store/middlewares/patch/patchGenerator';
import makeViewNeededData from '../store/middlewares/viewNeededData/viewNeededData';
import getLogger from '../common/logManager';
import { isDumpActivated } from '../serverProcess/utils/dumpBuffer';

const log = getLogger('server:store:enhancer');


let store;

const createMiddlewares = (identity, isDebugOn) => {
  const middlewares = [
    thunk,
    createIncomingDataMiddleware(lokiManager, get('INJECT_DATA_THROTTLE_TIMING'), get('PUB_SUB_MONITOR_TIMING')),
    createRetrieveDataMiddleware(ipc),
    createCacheMiddleware(lokiManager),
    makeMessagesMiddleware(),
    makeOnProcessOverload(),
    makePlayerMiddleware(get('PLAYER_FREQUENCY'), get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN')),
    makeDocumentsMiddleware(documentManager),
    makeInspectorMiddleware(rtdManager),
    makeProductLogMiddleware(ipc.dc.sendProductLog),
    makeViewNeededData(),
    makePatchGenerator(ipc.main.sendReduxPatch, identity, log, isDebugOn, get('PATCH_THROTTLE_TIMING')),
  ];
  if (isDumpActivated()) {
    middlewares.push(createDumpBufferMiddleware());
  }
  return middlewares;
};


export default function makeCreateStore(identity, isDebugOn) {
  return (initialState) => {
    const enhancer = applyMiddleware(...createMiddlewares(identity, isDebugOn));
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
