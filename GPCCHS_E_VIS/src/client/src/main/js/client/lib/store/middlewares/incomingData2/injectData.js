import _ from 'lodash/fp';
import * as types from '../../types';
import { injectDataRange, injectDataLast } from '../../actions/incomingData';
import dataMapGenerator from '../../../dataManager/map';

let dataMap = {};
let previousDataMap = {};
let queue = [];
const injectData = () => ({ dispatch, getState }) => next => (action) => { // eslint-disable-line
  if (action.type === types.NEW_DATA) {
    // dispatch(injectDataAction(action.payload.data));
    const dataToInject = action.payload.data;
    // console.log(dataToInject);
    throttledDispatch(dispatch, getState());
    addToQueue(dataToInject);
    // TODO pgaucher add throttle mechanism 
    // const { remoteId, data } = action.payload;

      // add to buffer on every call
    // addToQueue(remoteId, data);

      // send action to reducer only 1 time every frequency ms
    // throttledDispatch(getState(), next);
  }
  return next(action);
};

/**
 * A throttled function that pass action to reducer
 *
 * @type {function}
 */
const throttledDispatch = _.throttle(1, (dispatch, state) => {
  console.log('DISPATCH!!');
  // dataMap
  dataMap = dataMapGenerator(state);


  // console.log('[injectDataMidlwr] ON_NEW_DATA action : ', dataToInject);
  const oldViewMap = _.getOr({}, 'perView', previousDataMap);
  const newViewMap = _.getOr({}, 'perView', dataMap);

  const oldExpectedRangeIntervals = _.getOr({}, 'expectedRangeIntervals', previousDataMap);
  const newExpectedRangeIntervals = _.getOr({}, 'expectedRangeIntervals', dataMap);

  const oldExpectedLastIntervals = _.getOr({}, 'expectedLastIntervals', previousDataMap);
  const newExpectedLastIntervals = _.getOr({}, 'expectedLastIntervals', dataMap);

  const dataToInject = popQueue();

  const updateRangeData = injectDataRange(
    oldViewMap,
    newViewMap,
    oldExpectedRangeIntervals,
    newExpectedRangeIntervals,
    dataToInject
  );

  const updateLastData = injectDataLast(
    oldViewMap,
    newViewMap,
    oldExpectedLastIntervals,
    newExpectedLastIntervals,
    dataToInject
  );

  dispatch(updateRangeData);
  dispatch(updateLastData);

  previousDataMap = dataMap;
});

/**
 * Adds a payload to queue queue
 *
 * @param remoteId
 * @param data { [timestamp]: payload }
 */
function addToQueue(data) {
  const tbdIds = Object.keys(data);
  for (let i = 0; i < tbdIds.length; i += 1) {
    if (typeof queue[tbdIds[i]] === 'undefined') {
      queue[tbdIds[i]] = {};
    }

    queue[tbdIds[i]] = Object.assign(queue[tbdIds[i]], data[tbdIds[i]]);
  }
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

export default injectData;
