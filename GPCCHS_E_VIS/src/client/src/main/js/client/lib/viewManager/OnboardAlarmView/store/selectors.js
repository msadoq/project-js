import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getSortMode, getSortColumn, getExpandedAlarms } from 'viewManager/GroundAlarmView/store/uiReducer';
import sortDataBy from 'viewManager/commonData/sortDataBy';
import { getData } from './dataReducer';
import { getSearch, getEnableSearch } from './configurationReducer';

const isFiltered = (alarm, search) => _.pipe(
  _.entries,
  _.reduce(
    (acc, [k, v]) => acc && alarm[k].indexOf(v) !== -1
  )(true)
)(search);

export const getFilteredIndexes = createSelector(
  getData,
  getSearch,
  getEnableSearch,
  ({ lines, indexes }, search, enableSearch) => {
    if (enableSearch) {
      return _.filter((oid => (
        isFiltered(lines[oid], search)
      )), indexes);
    }
    return indexes;
  }
);

export const getFilteredSortedIndexes = createSelector(
  getData,
  getFilteredIndexes,
  getSortMode,
  getSortColumn,
  ({ lines }, indexes, sortMode, column) => (
    sortDataBy(oid => lines[oid].rawAlarm[column], sortMode, indexes)
  )
);

export const getDataRows = createSelector(
  getData,
  getFilteredSortedIndexes,
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
