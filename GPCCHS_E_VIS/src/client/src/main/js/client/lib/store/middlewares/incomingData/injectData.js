// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add throttle timing in configuration .
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add execution map trace in three middlewares to make performance analysis easier
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Merge branch 'pgaucher-redux-patch-improvment' into dev
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as types from 'store/types';
import { injectDataRange, injectDataLast } from 'store/actions/incomingData';
import dataMapGenerator from 'dataManager/map';
import executionMonitor from 'common/logManager/execution';
import { getCurrentVisuWindow } from 'store/selectors/timebars';

let dataMap = {};
let previousDataMap = {};
let buffer = {};
const injectData = (timing) => {
    /**
   * A throttled function that pass action to reducer
   *
   * @type {function}
   */
  const throttledDispatch = _.throttle(timing, (dispatch, state) => {
    dataMap = dataMapGenerator(state);

    const oldViewMap = _.getOr({}, 'perView', previousDataMap);
    const newViewMap = _.getOr({}, 'perView', dataMap);

    const oldExpectedRangeIntervals = _.getOr({}, 'expectedRangeIntervals', previousDataMap);
    const newExpectedRangeIntervals = _.getOr({}, 'expectedRangeIntervals', dataMap);

    const oldExpectedLastIntervals = _.getOr({}, 'expectedLastIntervals', previousDataMap);
    const newExpectedLastIntervals = _.getOr({}, 'expectedLastIntervals', dataMap);

    const dataToInject = cleanBuffer();
    const updateRangeData = injectDataRange(
      oldViewMap,
      newViewMap,
      oldExpectedRangeIntervals,
      newExpectedRangeIntervals,
      dataToInject,
      { HistoryViewConfiguration: state.HistoryViewConfiguration,
        GroundAlarmViewConfiguration: state.GroundAlarmViewConfiguration,
        OnboardAlarmViewConfiguration: state.OnboardAlarmViewConfiguration },
      getCurrentVisuWindow(state)
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
   * Adds a payload to buffer
   *
   * @param {Object} data { [tbdId]: { [timestamp]: payload } }
   */
  function addToBuffer(data) {
    const tbdIds = Object.keys(data);
    for (let i = 0; i < tbdIds.length; i += 1) {
      if (typeof buffer[tbdIds[i]] === 'undefined') {
        buffer[tbdIds[i]] = {};
      }
      buffer[tbdIds[i]] = Object.assign(buffer[tbdIds[i]], data[tbdIds[i]]);
    }
  }

  /**
   * Returns and reset current buffer
   * @returns {{}}
   */
  function cleanBuffer() {
    const data = buffer;
    buffer = {};
    return data;
  }

  return ({ dispatch, getState }) => next => (action) => {
    const nextAction = next(action);
    if (action.type !== types.NEW_DATA) {
      return nextAction;
    }

    const execution = executionMonitor('middleware:injectData');
    execution.start('global');
    const dataToInject = action.payload.data;
    addToBuffer(dataToInject);
    throttledDispatch(dispatch, getState());

    execution.stop('global');
    execution.print();
    return nextAction;
  };
};

export default injectData;
