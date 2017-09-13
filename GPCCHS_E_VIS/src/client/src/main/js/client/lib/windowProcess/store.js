import _always from 'lodash/fp/always';
import _set from 'lodash/fp/set';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { remote } from 'electron';
import makeRendererEnhancer from './storeEnhancer';
import { main } from './ipc';
import { computeDiffHrtime } from './common/timeFormats';
import {
  COMPUTED_TIMING_DATA,
  TIMING_MILESTONES,
  TIMING_DATA,
 } from '../constants';

let store;
const identity = `renderer-${remote.getCurrentWindow().windowId}`;
function prepareEnhancers(isDebugOn) {
  const enhancer = makeRendererEnhancer(
    identity,
    main.sendReduxDispatch,
    isDebugOn
  );

  const middlewares = [];

  // renderer (no debug)
  if (!isDebugOn) {
    return compose(applyMiddleware(thunk), enhancer, applyMiddleware(...middlewares));
  }
  // renderer (with debug)
  const reduxLogger = createLogger({
    level: 'info',
    collapsed: true,
    actionTransformer: isDebugOn ? decorateActionWithTiming : action => action,
  });

  const devMiddlewares = [reduxLogger];

  const isThereDevTools = typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = isThereDevTools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  return composeEnhancers(
    applyMiddleware(thunk),
    enhancer,
    applyMiddleware(...middlewares, ...devMiddlewares)
  );
}

/**
 * Decorate action received with readable datas about timing calculation
 * @param action
 * @return decorated action
 */
function setTime(action, key, previous, current) {
  return _set(
    ['meta', COMPUTED_TIMING_DATA, key],
    computeDiffHrtime(previous, current), action
  );
}
const decorateActionWithTiming = (action) => {
  let actionTmp = action;
  if (actionTmp.meta) {
    const timing = action.meta[TIMING_DATA];
    actionTmp = setTime(
      actionTmp,
      '1#RendererToServer',
      timing[TIMING_MILESTONES.BEFORE_SERVER_STORE_UPDATE],
      timing[`${TIMING_MILESTONES.SEND_UP}${identity}`]
    );

    actionTmp = setTime(
      actionTmp,
      '2#MainToServer',
      timing[TIMING_MILESTONES.BEFORE_SERVER_STORE_UPDATE],
      timing[`${TIMING_MILESTONES.SEND_UP}main`]
    );

    actionTmp = setTime(
      actionTmp,
      '3#serverDispatch',
      timing[TIMING_MILESTONES.AFTER_SERVER_STORE_UPDATE],
      timing[TIMING_MILESTONES.BEFORE_SERVER_STORE_UPDATE]
    );

    actionTmp = setTime(
      actionTmp,
      '4#ServerToMain',
      timing[`${TIMING_MILESTONES.BEFORE_STORE_UPDATE}main`],
      timing[TIMING_MILESTONES.AFTER_SERVER_STORE_UPDATE]
    );

    actionTmp = setTime(
      actionTmp,
      '5#mainApply',
      timing[`${TIMING_MILESTONES.AFTER_STORE_UPDATE}main`],
      timing[`${TIMING_MILESTONES.BEFORE_STORE_UPDATE}main`]
    );

    actionTmp = setTime(
      actionTmp,
      '6#MainToRenderer',
      process.hrtime(),
      timing[`${TIMING_MILESTONES.AFTER_STORE_UPDATE}main`]
    );
  }
  return actionTmp;
};

export default function makeCreateStore(isDebugOn) {
  return (initialState) => {
    const enhancer = prepareEnhancers(isDebugOn);
    store = createStore(_always({}), initialState, enhancer);
    return store;
  };
}

export function getStore() {
  if (!store) {
    throw new Error('store wasn\'t inited yet');
  }
  return store;
}
