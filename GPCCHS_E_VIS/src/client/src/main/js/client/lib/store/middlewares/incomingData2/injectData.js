import _ from 'lodash/fp';
import * as types from '../../types';
import { injectDataRange, injectDataLast } from '../../actions/incomingData';
import dataMapGenerator from '../../../dataManager/map';

let dataMap = {};
let previousDataMap = {};

const injectData = () => ({ dispatch, getState }) => next => (action) => { // eslint-disable-line
  if (action.type === types.NEW_DATA) {
    // dispatch(injectDataAction(action.payload.data));
    dataMap = dataMapGenerator(getState());

    const dataToInject = action.payload.data;
    const oldViewMap = _.getOr({}, 'perView', previousDataMap);
    const newViewMap = _.getOr({}, 'perView', dataMap);

    const oldExpectedRangeIntervals = _.getOr({}, 'expectedRangeIntervals', previousDataMap);
    const newExpectedRangeIntervals = _.getOr({}, 'expectedRangeIntervals', dataMap);

    const oldExpectedLastIntervals = _.getOr({}, 'expectedLastIntervals', previousDataMap);
    const newExpectedLastIntervals = _.getOr({}, 'expectedLastIntervals', dataMap);

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
    // TODO pgaucher add throttle mechanism 
    // const { remoteId, data } = action.payload;

      // add to buffer on every call
    // addToQueue(remoteId, data);

      // send action to reducer only 1 time every frequency ms
    // throttledDispatch(getState(), next);
  }
  return next(action);
};

export default injectData;
