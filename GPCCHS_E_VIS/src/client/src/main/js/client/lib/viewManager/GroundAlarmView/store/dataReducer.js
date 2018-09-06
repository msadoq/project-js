import _ from 'lodash/fp';

import cleanCurrentViewData from './cleanViewData';
import { viewRangeAdd, selectDataPerView } from './viewDataUpdate';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import {
  getViewEntryPoint,
  getVisuWindowByViewId,
} from '../../../store/selectors/views';
import {
  ALARM_ACKSTATE_REQUIREACK,
  ALARM_MODE_ALL,
  ALARM_MODE_NONNOMINAL,
  ALARM_MODE_TOACKNOWLEDGE,
  ALARM_TYPE_NOMINAL,
} from '../../../constants';
import {
  WS_TIMEBAR_UPDATE_CURSORS,
  INJECT_DATA_RANGE,
  WS_VIEWDATA_CLEAN, WS_VIEW_UPDATE_ENTRYPOINT,
} from '../../../store/types';
import { VM_VIEW_GROUNDALARM } from '../../constants';

/**
 * Determines whether an alarm should be shown to the operator
 *
 * @param groundAlarm
 * @param visuWindow
 * @param mode
 * @returns {*}
 */
function _shouldShowAlarm(groundAlarm, { visuWindow, mode }) {
  const { current, lower, upper } = visuWindow;

  const _isAlarmOpen = alarm =>
    (!alarm.closingDate || new Date(alarm.closingDate).getTime() > current);

  const _isAlarmActive = alarm =>
    _isAlarmOpen(alarm) &&
    alarm.alarmType !== ALARM_TYPE_NOMINAL &&
    new Date(alarm.creationDate).getTime() < current;

  const _hasAlarmBeenRaisedInsideVisuWindow = alarm =>
    new Date(alarm.creationDate).getTime() >= lower &&
    new Date(alarm.creationDate).getTime() <= upper;

  const _doesAlarmRequireAcknowledgment = alarm => alarm.ackState === ALARM_ACKSTATE_REQUIREACK;

  switch (mode) {
    case ALARM_MODE_NONNOMINAL:
      return _isAlarmActive(groundAlarm);
    case ALARM_MODE_ALL:
      return _isAlarmActive(groundAlarm) || _hasAlarmBeenRaisedInsideVisuWindow(groundAlarm);
    case ALARM_MODE_TOACKNOWLEDGE:
      return _isAlarmOpen(groundAlarm) && _doesAlarmRequireAcknowledgment(groundAlarm);
    default:
      return true;
  }
}

/**
 * Updates alarm indexes to match shown alarms
 *
 * @param state
 * @param visuWindow
 * @param mode
 * @returns {*}
 * @private
 */
const _refreshShownAlarms = (state = {}, { visuWindow, mode }) => {
  if (!visuWindow || !mode) {
    return state;
  }

  const lines = _.getOr({}, 'lines', state);

  const updatedIndexes = Object.keys(lines)
    .reduce((acc, oid) => {
      const alarm = lines[oid];

      if (_shouldShowAlarm(alarm, { visuWindow, mode })) {
        return [...acc, oid];
      }

      return acc;
    }, []);

  return _.set('indexes', updatedIndexes, state);
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
const scopedGroundAlarmViewDataReducer = (state = {}, action, viewId, rootState) => {
  const _getAlarmMode = () => {
    const entryPoint = getViewEntryPoint(rootState, { viewId, epName: 'groundAlarmEP' });

    return entryPoint.mode;
  };
  const _getVisuWindow = () => getVisuWindowByViewId(rootState, { viewId });

  switch (action.type) {
    case INJECT_DATA_RANGE: {
      const {
        dataToInject,
        newViewMap,
        newExpectedRangeIntervals,
        visuWindow: actionVisuWindow, // visuWindow provided by action payload and not current state
      } = action.payload;

      const dataKeys = Object.keys(dataToInject);

      if (!dataKeys.length) {
        return state;
      }

      let updatedState = state || {};

      const epSubState = selectDataPerView(
        newViewMap[viewId],
        newExpectedRangeIntervals,
        dataToInject,
        actionVisuWindow
      );
      if (Object.keys(epSubState).length !== 0) {
        updatedState = viewRangeAdd(
          updatedState,
          viewId,
          epSubState
        );
      }

      const visuWindow = _getVisuWindow();
      const mode = _getAlarmMode();

      updatedState = _refreshShownAlarms(updatedState, { visuWindow, mode });

      return updatedState;
    }
    case WS_VIEWDATA_CLEAN: {
      const { previousDataMap, dataMap } = action.payload;
      let updatedState = state;

      updatedState = cleanCurrentViewData(
        state,
        previousDataMap.perView[viewId],
        dataMap.perView[viewId],
        previousDataMap.expectedRangeIntervals,
        dataMap.expectedRangeIntervals
      );

      const visuWindow = _getVisuWindow();
      const mode = _getAlarmMode();

      updatedState = _refreshShownAlarms(updatedState, { visuWindow, mode });

      return updatedState;
    }
    case WS_TIMEBAR_UPDATE_CURSORS:
    case WS_VIEW_UPDATE_ENTRYPOINT: {
      const visuWindow = _getVisuWindow();
      const mode = _getAlarmMode();

      return _refreshShownAlarms(state, { visuWindow, mode });
    }
    default:
      return state;
  }
};

export const getGroundAlarmViewData = state => state.GroundAlarmViewData;

export const getData = (state, { viewId }) => getGroundAlarmViewData(state)[viewId] || {};

export default createScopedDataReducer(scopedGroundAlarmViewDataReducer, {}, VM_VIEW_GROUNDALARM);
