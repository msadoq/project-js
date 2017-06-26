import _getOr from 'lodash/fp/getOr';
import _set from 'lodash/fp/set';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { remote } from 'electron';
import makeRendererEnhancer from './storeEnhancer';
import reducer from '../store/reducers';
import { main } from './ipc';
import { computeDiffHrtime } from './common/timeFormats';
import {
  COMPUTED_TIMING_DATA,
  TIMING_MILESTONES,
  TIMING_DATA,
  REDUX_SYNCHRONIZATION_PATCH_KEY,
 } from '../constants';

let store;

function prepareEnhancers(isDebugOn) {
  const enhancer = makeRendererEnhancer(
    `renderer-${remote.getCurrentWindow().windowId}`,
    main.sendReduxDispatch
  );

  // renderer (no debug)
  if (!isDebugOn) {
    return compose(applyMiddleware(thunk), enhancer);
  }

  // renderer (with debug)
  const reduxLogger = createLogger({
    level: 'info',
    collapsed: true,
    predicate: (state, action) => (
      _getOr(false, ['meta', REDUX_SYNCHRONIZATION_PATCH_KEY], action) !== false
    ),
    actionTransformer: (action) => {
      const actionWithTiming = decorateActionWithTiming(action);
      return actionWithTiming;
    },
  });

  const isThereDevTools = typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = isThereDevTools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  return composeEnhancers(applyMiddleware(thunk, reduxLogger), enhancer);
}

/**
 * Decorate action received with readable datas about timing calculation
 * @param action
 * @return decorated action
 */
const decorateActionWithTiming = (action) => {
  let actionTmp = action;
  if (actionTmp.meta) {
    const currentTiming = process.hrtime();
    actionTmp = _set(['meta', COMPUTED_TIMING_DATA, '1#RendererToMain'], computeDiffHrtime(action.meta[TIMING_DATA][TIMING_MILESTONES.MAIN_UP], action.meta[TIMING_DATA][TIMING_MILESTONES.RENDERER_UP]), actionTmp);
    actionTmp = _set(['meta', COMPUTED_TIMING_DATA, '2#MainToServer'], computeDiffHrtime(action.meta[TIMING_DATA][TIMING_MILESTONES.BEFORE_SERVER_STORE_UPDATE], action.meta[TIMING_DATA][TIMING_MILESTONES.MAIN_UP]), actionTmp);
    actionTmp = _set(['meta', COMPUTED_TIMING_DATA, '3#ServerStoreUpdate'], computeDiffHrtime(action.meta[TIMING_DATA][TIMING_MILESTONES.AFTER_SERVER_STORE_UPDATE], action.meta[TIMING_DATA][TIMING_MILESTONES.BEFORE_SERVER_STORE_UPDATE]), actionTmp);
    actionTmp = _set(['meta', COMPUTED_TIMING_DATA, '4#ServerToMain'], computeDiffHrtime(action.meta[TIMING_DATA][TIMING_MILESTONES.BEFORE_MAIN_STORE_UPDATE], action.meta[TIMING_DATA][TIMING_MILESTONES.AFTER_SERVER_STORE_UPDATE]), actionTmp);
    actionTmp = _set(['meta', COMPUTED_TIMING_DATA, '5#MainStoreUpdate'], computeDiffHrtime(action.meta[TIMING_DATA][TIMING_MILESTONES.AFTER_MAIN_STORE_UPDATE], action.meta[TIMING_DATA][TIMING_MILESTONES.BEFORE_MAIN_STORE_UPDATE]), actionTmp);
    actionTmp = _set(['meta', COMPUTED_TIMING_DATA, '6#MainToRenderer'], computeDiffHrtime(currentTiming, action.meta[TIMING_DATA][TIMING_MILESTONES.AFTER_MAIN_STORE_UPDATE]), actionTmp);
  }
  return actionTmp;
};

export default function makeCreateStore(isDebugOn) {
  return (initialState) => {
    const enhancer = prepareEnhancers(isDebugOn);
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
