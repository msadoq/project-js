import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getSortMode, getSortColumn, getExpandedAlarms } from 'viewManager/GroundAlarmView/store/uiReducer';
import sortDataBy from 'viewManager/commonData/sortDataBy';
import { getData } from './dataReducer';

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
  getExpandedAlarms,
  (data, sortedIndexes, expandedAlarms) => _.flatMap((lineId) => {
    const alarm = data.lines[lineId];
    const mainRow = {
      type: 'row',
      data: alarm,
    };
    const parameters = _.isEmpty(alarm.parameters) || !expandedAlarms[alarm.oid] ? [] : [
      {
        type: 'subrow_header_title',
        data: 'PARAMETERS',
        mainRow,
      },
      {
        type: 'subrow_header',
        mainRow,
      },
      ...alarm.parameters.map((parameter, index) => ({
        type: 'subrow',
        data: parameter,
        mainRow,
        subRowIndex: index,
      })),
    ];
    return [
      {
        ...mainRow,
        mainRow,
      },
      ...parameters,
    ];
  }, sortedIndexes)
);
