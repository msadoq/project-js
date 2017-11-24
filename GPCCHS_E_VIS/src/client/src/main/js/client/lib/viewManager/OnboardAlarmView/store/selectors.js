import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getData } from './dataReducer';
import { getSortMode, getSortColumn } from '../../GroundAlarmView/store/uiReducer';
import sortDataBy from '../../commonData/sortDataBy';

export const getSortedIndexes = createSelector(
  getData,
  getSortMode,
  getSortColumn,
  ({ lines, indexes }, sortMode, column) => (
    sortDataBy(oid => lines[oid].rawAlarm[column], sortMode, indexes)
  )
);

export const getDataRows = createSelector(
  getData,
  getSortedIndexes,
  (data, sortedIndexes) => _.flatMap((lineId) => {
    const alarm = data.lines[lineId];
    const alarmWithoutParameters = _.omit('parameters', alarm);
    const parameters = _.isEmpty(alarm.parameters) || alarm.collapsed ? [] : [
      {
        type: 'parameter_header',
        alarm: alarmWithoutParameters,
      },
      {
        type: 'parameter_header_title',
        alarm: alarmWithoutParameters,
      },
      ...alarm.parameters.map((parameter, index) => ({
        type: 'parameter',
        data: parameter,
        alarm: alarmWithoutParameters,
        parameterIndex: index,
      })),
    ];
    return [
      {
        type: 'alarm',
        data: alarmWithoutParameters,
        alarm: alarmWithoutParameters,
      },
      ...parameters,
    ];
  }, sortedIndexes)
);
