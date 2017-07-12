import _ from 'lodash/fp';
import * as types from '../types';
import { updateViewData } from '../../viewManager/commonActions/dataActions';
import dataMapGenerator from '../../dataManager/map'; // TODO dbrugne dataMap generated here?

function makeIncomingDataMiddleware(frequency) {
  /**
   * A local queue that store incoming payloads between two .dispatch()
   * @type {{}}
   */
  let queue = {};

  /**
   * The dataMap at the moment of the last .dispatch() call
   */
  let previousDataMap;

  /**
   * Adds a payload to queue queue
   *
   * @param remoteId
   * @param data { [timestamp]: payload }
   */
  function addToQueue(remoteId, data) {
    if (typeof queue[remoteId] === 'undefined') {
      queue[remoteId] = {};
    }

    queue[remoteId] = Object.assign(queue[remoteId], data);
  }

  /**
   * Returns and reset current queue
   * @returns {{}}
   */
  function popQueue() {
    const data = queue;
    queue = {};
    return data;
  }

  /**
   * A throttled function that pass action to reducer
   *
   * @type {function}
   */
  const throttledDispatch = _.throttle(frequency, (state, next) => {
    console.log('DISPATCH!!');
    // dataMap
    const dataMap = dataMapGenerator(state);

    const updateAction = updateViewData(
      _.getOr({}, 'perView', previousDataMap),
      _.getOr({}, 'perView', dataMap),
      _.getOr({}, 'expectedIntervals', previousDataMap),
      _.getOr({}, 'expectedIntervals', dataMap),
      popQueue()
    );

    // send action in reducer
    next(updateAction);

    // persist previous dataMap for next call
    previousDataMap = dataMap;
  });

  /**
   * Middleware that intercepts incoming data from DC actions.
   *
   * On each action add payloads to queue OR .dispatch() an import data action depending on time
   * elapsed from previous .dispatch().
   *
   * This mechanism allow frequency decoupling and event loop health preservation.
   *
   * @params {Store} store
   * @returns {{}}
   */
  return function incomingDataMiddleware({ getState }) {
    return next => (action) => {
      if (action.type !== types.DATA_INCOMING_ARCHIVE
        && action.type !== types.DATA_INCOMING_PUBSUB) {
        return next(action);
      }

      // const { dispatch, getState } = store;
      const { remoteId, data } = action.payload;

      // add to buffer on every call
      addToQueue(remoteId, data);

      // send action to reducer only 1 time every frequency ms
      throttledDispatch(getState(), next);

      return action;
    };
  };
}

export default makeIncomingDataMiddleware;
