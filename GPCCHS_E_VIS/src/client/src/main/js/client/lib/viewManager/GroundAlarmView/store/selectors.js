import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getViewEntryPoints } from '../../../store/selectors/views';
import { getData } from './dataReducer';
import { getSortMode, getSortColumn } from './uiReducer';
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
  (data, sortedIndexes) => _.flatMap((lineId) => {
    const alarm = data.lines[lineId];
    const alarmWithoutTransitions = _.omit('transitions', alarm);
    const transitions = _.isEmpty(alarm.transitions) || alarm.collapsed ? [] : [
      {
        type: 'transition_header_title',
        alarm: alarmWithoutTransitions,
      },
      {
        type: 'transition_header',
        alarm: alarmWithoutTransitions,
      },
      ...alarm.transitions.map(transition => ({
        type: 'transition',
        data: transition,
        alarm: alarmWithoutTransitions,
      })),
    ];
    return [
      {
        type: 'alarm',
        data: alarmWithoutTransitions,
        alarm: alarmWithoutTransitions,
      },
      ...transitions,
    ];
  }, sortedIndexes)
);
