// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : #6670 : 21/06/2017 : Add basic player middleware .
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Place thunk middleware before all middlewares in serverProcess/store
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Configure player middleware with correct environment variables
// VERSION : 1.1.2 : DM : #6785 : 29/06/2017 : Fix opening view link in a new page and read only path for link definition
// VERSION : 1.1.2 : DM : #6785 : 03/07/2017 : Add unit tests on open link middleware
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add basic documents redux middleware, support page opening only
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing decorator on DEBUG only (for each process) - Move decorator on makeSlave/MasterDispatcher
// VERSION : 1.1.2 : DM : #6700 : 12/07/2017 : Add incomingData middleware that throttle data sending to reducers
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move openLink middleware in documents middleware
// VERSION : 1.1.2 : DM : #6700 : 19/07/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rename all create* middleware by make*
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Add inspector middleware in serverProcess store
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Add skeleton for incomingData and retrieveData middleware + their test
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Use rtdManager as dependency injection in inspector middleware
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : Add lokiMananger as parameter of middlewares
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess + replace old IPC productLog
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update some tests . . .
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 24/08/2017 : Fix store compose middleware . .
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add redux and patch workflow improvment + remove store observer
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add throttle timing in configuration .
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : Add throttle mechanism in patch reducer
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : Add middleware to apply pause on master overload
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : move dumpBuffer use in a specific middleware
// END-HISTORY
// ====================================================================

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { get } from '../common/configurationManager';
import makeMessagesMiddleware from '../store/middlewares/messages';
import createDumpBufferMiddleware from '../store/middlewares/dumpBuffer';
import createRetrieveDataMiddleware from '../store/middlewares/retrieveData';
import createCacheMiddleware from '../store/middlewares/cache';
import reducer from '../store/reducers';
import ipc from './ipc';
import documentManager from './documentManager';
import lokiManager from './models/lokiKnownRangesData';
import makeAckMiddleware from '../store/middlewares/ack';
import { isDumpActivated } from '../serverProcess/utils/dumpBuffer';
import createIncomingDataMiddleware from '../store/middlewares/incomingData';
import makeOnProcessOverload from '../store/middlewares/player/processOverload';
import makeDocumentsMiddleware from '../store/middlewares/documents';
import makeInspectorMiddleware from '../store/middlewares/inspector';
import * as rtdManager from '../rtdManager';
import makeProductLogMiddleware from '../store/middlewares/productLog';
import makePatchGenerator from '../store/middlewares/patch/patchGenerator';
import makeViewNeededData from '../store/middlewares/viewNeededData/viewNeededData';
import pageSessionOrDomainUpdated from '../store/middlewares/pages/pageSessionOrDomainUpdated';
import windowSessionOrDomainUpdated from '../store/middlewares/windows/windowSessionOrDomainUpdated';
import getLogger from '../common/logManager';
import makePlayerMiddleware from '../store/middlewares/player';

const log = getLogger('server:store:enhancer');


let store;

const createMiddlewares = (identity, isDebugOn) => {
  const middlewares = [
    thunk,
    createIncomingDataMiddleware(lokiManager, get('INJECT_DATA_THROTTLE_TIMING'), get('PUB_SUB_MONITOR_TIMING')),
    createRetrieveDataMiddleware(ipc),
    createCacheMiddleware(lokiManager),
    makeAckMiddleware(ipc.dc.requestAck),
    makeMessagesMiddleware(),
    makeOnProcessOverload(),
    makePlayerMiddleware(get('PLAYER_FREQUENCY'), get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN')),
    makeDocumentsMiddleware(documentManager),
    makeInspectorMiddleware(rtdManager),
    makeProductLogMiddleware(ipc.dc.sendProductLog),
    makeViewNeededData(),
    pageSessionOrDomainUpdated,
    windowSessionOrDomainUpdated,
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
