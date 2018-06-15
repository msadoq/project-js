// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add throttle timing in configuration .
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add execution map trace in three middlewares to make
//  performance analysis easier
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Merge branch 'pgaucher-redux-patch-improvment' into
//  dev
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// VERSION : 2.0.0 : DM : #7111 : 25/09/2017 : Add current in history view data
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update server process and data injection for alarms
// VERSION : 2.0.0 : DM : #5806 : 10/10/2017 : Fix in GroundAlarmView reducers .
// VERSION : 2.0.0 : DM : #5806 : 13/10/2017 : change middleware behavior to manage alarm pubsub
//  data
// VERSION : 2.0.0 : DM : #5806 : 08/11/2017 : fix payload generation + fix middleware problems
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 30/01/2018 : Unit convertion, add python fork and
//  convertion call mechanism
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 31/01/2018 : Add unit convertion for plotview
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import _forEach from 'lodash/forEach';
import * as types from 'store/types';
import { injectDataRange, injectDataLast, injectDataObsoleteEvent } from 'store/actions/incomingData';
import dataMapGenerator from 'dataManager/map';
import executionMonitor from 'common/logManager/execution';
import { getCurrentVisuWindow } from 'store/selectors/timebars';
import { convertData, mapUnitConvertion } from '../../helpers/unitConverterHelper';

let dataMap = {};
let previousDataMap = {};
let buffer = {
  ranges: {},
  lasts: {},
  obsoleteEvents: {},
};
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

    const toConvertMap = mapUnitConvertion(newViewMap);
    convertData(toConvertMap, dataToInject, (err, convertedDataToInject) => {
      // TODO HANDLE ERROR
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }

      const ranges = convertedDataToInject.ranges || {};
      const lasts = convertedDataToInject.lasts || {};
      const obsoleteEvents = convertedDataToInject.obsoleteEvents || {};

      const visuWindow = getCurrentVisuWindow(state);

      const updateRangeData = injectDataRange(
        oldViewMap,
        newViewMap,
        oldExpectedRangeIntervals,
        newExpectedRangeIntervals,
        ranges,
        { HistoryViewConfiguration: state.HistoryViewConfiguration,
          GroundAlarmViewConfiguration: state.GroundAlarmViewConfiguration,
          OnboardAlarmViewConfiguration: state.OnboardAlarmViewConfiguration,
          PlotViewConfiguration: state.PlotViewConfiguration },
        visuWindow
      );
      const updateLastData = injectDataLast(
        oldViewMap,
        newViewMap,
        oldExpectedLastIntervals,
        newExpectedLastIntervals,
        lasts
      );
      const updateObsoleteEventData = injectDataObsoleteEvent(
        obsoleteEvents,
        newViewMap,
        state
      );
      dispatch(updateRangeData);
      dispatch(updateLastData);
      dispatch(updateObsoleteEventData);

      previousDataMap = dataMap;
    });
  });

  /**
   * Adds a payload to buffer
   *
   * @param {Object} data { [tbdId]: { [timestamp]: payload } }
   */
  function addToBuffer(data) {
    const dataTypes = Object.keys(data);
    _forEach(dataTypes, (dataType) => {
      const tbdIds = Object.keys(data[dataType]);
      _forEach(tbdIds, (tbdId) => {
        if (typeof buffer[dataType][tbdId] === 'undefined') {
          buffer[dataType][tbdId] = {};
        }
        buffer[dataType][tbdId] = {
          ...buffer[dataType][tbdId],
          ...data[dataType][tbdId],
        };
      });
    });
  }

  /**
   * Returns and reset current buffer
   * @returns {{}}
   */
  function cleanBuffer() {
    const data = buffer;
    buffer = {
      ranges: {},
      lasts: {},
      obsoleteEvents: {},
    };
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
