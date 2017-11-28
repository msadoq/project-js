import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getViewEntryPoints } from '../../../store/selectors/views';
import { getData } from './dataReducer';
import { getSortMode, getSortColumn, getExpandedAlarms } from './uiReducer';
import sortDataBy from '../../commonData/sortDataBy';

export const getInspectorOptions = createSelector(
  getViewEntryPoints,
  (entryPoints) => {
    const epName = Object.keys(entryPoints)[0];
    const ep = Object.values(entryPoints)[0];
    return {
      epName,
      epId: ep.id,
      dataId: ep.dataId,
      field: ep.field,
    };
  }
);

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
    const transitions = _.isEmpty(alarm.transitions) || !expandedAlarms[alarm.oid] ? [] : [
      {
        type: 'subrow_header_title',
        data: 'TRANSITIONS',
        mainRow,
      },
      {
        type: 'subrow_header',
        mainRow,
      },
      ...alarm.transitions.map(transition => ({
        type: 'subrow',
        data: transition,
        mainRow,
      })),
    ];
    return [
      {
        ...mainRow,
        mainRow,
      },
      ...transitions,
    ];
  }, sortedIndexes)
);
